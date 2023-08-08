//zustand//
import create from "zustand";
const defaultState = {
  isOpen: false,
  jsxBody: null,
  jsxButton: null,
  isTodayClose: false,
  bgClick: null,
};

export interface ModalState {
  jsxBody: any;
  jsxButton: any;
  isOpen: any;
  isTodayClose: any;
  bgClick: any;
  setIsOpen: (value: any) => void;
  setJsxBody: (value: any) => void;
  setJsxButton: (value: any) => void;
  setIsTodayClose: (value: any) => void;
  setBgClick: (value: any) => void;
  reset: () => void;
}

export const useOverlayState = create<ModalState>((set) => ({
  ...defaultState,
  setJsxBody: (value) => set(() => ({ jsxBody: value })),
  setJsxButton: (value) => set(() => ({ jsxButton: value })),
  setIsOpen: (value) => set(() => ({ isOpen: value })),
  setIsTodayClose: (value) => set(() => ({ isTodayClose: value })),
  setBgClick: (value) => set(() => ({ bgClick: value })),
  reset: () => set(() => defaultState),
}));
