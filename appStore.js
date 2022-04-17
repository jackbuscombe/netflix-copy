import create from "zustand";

export const useStore = create((set) => ({
	user: null,
	setUser: (e) => set({ user: e }),
}));
