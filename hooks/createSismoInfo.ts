import {create} from "zustand";

export const useSismoInfo = create((set) => ({
    vaultId: "",
    setVaultId: (vaultId: string) => set({vaultId}),
}));