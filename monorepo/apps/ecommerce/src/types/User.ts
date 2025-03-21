import {z} from "zod";

export interface User {
  id: string;
  name: string;
  role: "CLIENT" | "ADMIN";
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (username: string, role: "CLIENT" | "ADMIN") => void;
  logout: () => void;
}

export const schemaLogin = z.object({
  username: z.string().min(2, {
    message: "El usuario es requerido"
  }),
  role: z.enum(["CLIENT", "ADMIN"], {
    message: "El rol es requerido"
  })
});
