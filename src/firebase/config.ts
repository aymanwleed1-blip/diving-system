import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// هذه هي بيانات مشروعك الخاصة التي وجدناها
const firebaseConfig = {
  apiKey: "AIzaSyA6tlwG06BWrYyq6R-KFiqY0d6pA_4s6Gc",
  authDomain: "diving-system-4ccc5.firebaseapp.com",
  projectId: "diving-system-4ccc5",
  storageBucket: "diving-system-4ccc5.firebasestorage.app",
  messagingSenderId: "611576632341",
  appId: "1:611576632341:web:b4c4224e09860dbdd96a1c",
  measurementId: "G-022QQV6JCB"
};

// تشغيل النظام
const app = initializeApp(firebaseConfig);

// هذه الأسطر هي "المفاتيح" التي تفتح أبواب التسجيل وقاعدة البيانات
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;