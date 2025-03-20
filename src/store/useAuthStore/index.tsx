// src/store/useAuthStore/index.ts
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {AuthState, User} from "@/types/User";

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,

      login: (username, role) => {
        const user: User = {
          id: crypto.randomUUID(),
          name: username,
          role
        };

        set({
          user,
          isLoggedIn: true,
          isAdmin: role === "ADMIN"
        });
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          isAdmin: false
        });
      }
    }),
    {
      name: "auth-prueba-tecnica",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
