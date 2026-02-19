
export interface SalahTracker {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  tarawih: boolean;
  duha: boolean;
  tahiyatulWudu: boolean; // Added extra item from PDF
  sunnat: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

export interface QuranTracker {
  ayat: string;
  page: string;
  para: string;
}

export interface DailyData {
  achievement: string;
  salah: SalahTracker;
  quran: QuranTracker;
  checklist: boolean[]; // Indices mapping to constants.CHECKLIST_ITEMS
}

export interface AppState {
  userName: string;
  dailyData: Record<number, DailyData>;
  achievements: string[];
  disappointments: string[];
  reflections: string;
}

export interface StaticDayContent {
  day: number;
  ayatAr: string;
  ayatBn: string;
  ayatRef: string;
  hadithBn: string;
  hadithRef: string;
  duaAr: string;
  duaBn: string;
  duaRef: string;
  dailyTask: string;
  allahNames: { nameAr: string; nameBn: string; meaningBn: string }[];
}
