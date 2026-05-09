import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  getDocs,
  serverTimestamp,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db, auth } from './config';

export interface DiveLog {
  id?: string;
  diverName: string;
  diverId?: string;
  targetDepth: number;
  plannedTime: number;
  extraNotes?: string;
  status: 'in-progress' | 'completed' | 'submitted' | 'approved';
  date: string;
  startTime?: Timestamp | null;
  endTime?: Timestamp | null;
  maxDepth?: number;
  bottomTime?: number;
  gasType?: string;
  supervisorId: string;
  supervisorName: string;
  createdAt: any;
  updatedAt: any;
  customFields?: Record<string, any>; // Dynamic field storage
}

const ACTIVE_COLLECTION = 'activedives';
const COMPLETED_COLLECTION = 'completedlogs';

export const diveService = {
  // Create a new dive (Pre-briefing / Add Diver) -> Save to ACTIVE_COLLECTION
  async createDive(diveData: Partial<DiveLog>) {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');

    return addDoc(collection(db, ACTIVE_COLLECTION), {
      ...diveData,
      status: 'in-progress',
      date: new Date().toISOString().split('T')[0],
      supervisorId: user.uid,
      supervisorName: user.displayName || 'Unknown',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  // Update active dive data
  async updateDive(diveId: string, data: Partial<DiveLog>) {
    const diveRef = doc(db, ACTIVE_COLLECTION, diveId);
    return updateDoc(diveRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  // MOVE From ACTIVE_COLLECTION to COMPLETED_COLLECTION
  async completeDive(diveId: string, activeData: DiveLog, finalData: Partial<DiveLog>) {
    // 1. Prepare data for completed log
    const completedLog = {
      ...activeData,
      ...finalData,
      status: 'completed',
      endTime: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    // Explicitly delete ID from data before saving to new collection
    if (completedLog.id) delete completedLog.id;

    // 2. Create in completedLogs
    const completedRef = await addDoc(collection(db, COMPLETED_COLLECTION), completedLog);

    // 3. Delete from activeDives
    await deleteDoc(doc(db, ACTIVE_COLLECTION, diveId));

    return completedRef;
  },

  // Subscribe to active dives (Real-time sync)
  subscribeToActiveDives(callback: (dives: DiveLog[]) => void) {
    const q = query(
      collection(db, ACTIVE_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const dives = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DiveLog[];
      callback(dives);
    });
  },

  // Subscribe to completed dives (Reports)
  subscribeToCompletedDives(callback: (dives: DiveLog[]) => void) {
    const q = query(
      collection(db, COMPLETED_COLLECTION),
      orderBy("updatedAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const dives = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DiveLog[];
      callback(dives);
    });
  },

  // Delete completed dive (Admin only)
  async deleteCompletedDive(diveId: string) {
    const diveRef = doc(db, COMPLETED_COLLECTION, diveId);
    return deleteDoc(diveRef);
  },
};
