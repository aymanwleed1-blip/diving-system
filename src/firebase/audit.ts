import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export async function logAction(userId: string, username: string, role: string, action: string, entityId: string, entityType: string, oldValue?: any, newValue?: any) {
  try {
    await addDoc(collection(db, 'auditLogs'), {
      userId,
      username,
      role,
      action,
      entityId,
      entityType,
      oldValue,
      newValue,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Failed to log audit action:", error);
  }
}
