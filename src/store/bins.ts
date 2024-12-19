import { create } from 'zustand';

interface BIN {
  id: string;
  bin: string;
  isValid: boolean;
  createdAt: Date;
}

interface BINState {
  bins: BIN[];
  addBIN: (bin: string) => void;
  removeBIN: (id: string) => void;
  checkBIN: (bin: string) => boolean;
}

export const useBINStore = create<BINState>((set, get) => ({
  bins: [],
  addBIN: (bin: string) => {
    set((state) => ({
      bins: [
        ...state.bins,
        {
          id: crypto.randomUUID(),
          bin,
          isValid: true,
          createdAt: new Date(),
        },
      ],
    }));
  },
  removeBIN: (id: string) => {
    set((state) => ({
      bins: state.bins.filter((bin) => bin.id !== id),
    }));
  },
  checkBIN: (cardNumber: string) => {
    const bin = cardNumber.slice(0, 6);
    return get().bins.some((b) => b.bin === bin && b.isValid);
  },
}));