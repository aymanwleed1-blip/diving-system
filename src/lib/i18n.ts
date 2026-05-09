import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "RSEAS Dive Management",
      "dashboard": "Dashboard",
      "active_dives": "Active Dives",
      "history": "Dive History",
      "reports": "Reports",
      "settings": "Settings",
      "add_diver": "Add Diver",
      "admin": "Admin",
      "superintendent": "Superintendent",
      "supervisor": "Supervisor",
      "viewer": "Viewer",
      "start_dive": "Start Dive",
      "end_dive": "End Dive",
      "diver_name": "Diver Name",
      "depth": "Depth",
      "max_depth": "Max Depth",
      "bottom_time": "Bottom Time",
      "ndl": "NDL",
      "status": "Status",
      "safe": "Safe",
      "warning": "Warning",
      "danger": "Danger",
      "start": "Start",
      "stop": "Stop",
      "save": "Save",
      "cancel": "Cancel",
      "login_with_google": "Login with Google",
      "logout": "Logout",
      "managed_by": "Managed by RSEAS",
      "disclaimer": "For training, planning, and operational assistance only. Not a replacement for certified commercial dive computers, official US Navy dive tables, or approved commercial diving procedures."
    }
  },
  ar: {
    translation: {
      "app_name": "إدارة غوص RSEAS",
      "dashboard": "لوحة القيادة",
      "active_dives": "عمليات الغوص النشطة",
      "history": "سجل الغوص",
      "reports": "التقارير",
      "settings": "الإعدادات",
      "add_diver": "إضافة غواص",
      "admin": "مشرف",
      "superintendent": "مدير عمليات",
      "supervisor": "مشرف غوص",
      "viewer": "مشاهد",
      "start_dive": "بدء الغوص",
      "end_dive": "إنهاء الغوص",
      "diver_name": "اسم الغواص",
      "depth": "العمق",
      "max_depth": "أقصى عمق",
      "bottom_time": "وقت القاع",
      "ndl": "حدود عدم التخفيف",
      "status": "الحالة",
      "safe": "آمن",
      "warning": "تحذير",
      "danger": "خطر",
      "start": "بدء",
      "stop": "إيقاف",
      "save": "حفظ",
      "cancel": "إلغاء",
      "login_with_google": "تسجيل الدخول بجوجل",
      "logout": "تسجيل الخروج",
      "managed_by": "مدار بواسطة RSEAS",
      "disclaimer": "للتدريب والتخطيط والمساعدة العملياتية فقط. ليس بديلاً عن أجهزة كمبيوتر الغوص المعتمدة، أو جداول غوص البحرية الأمريكية الرسمية، أو إجراءات الغوص التجاري المعتمدة."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
