import { create } from 'zustand';

interface Settings {
  companyName: string;
  logoUrl: string;
  primaryColor: string;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    companyName: 'Payment Gateway',
    logoUrl: '',
    primaryColor: '#3B82F6',
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));