import {z} from "zod";

export const schemaLocation = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido"
  }),
  phone: z.string().min(10, {
    message: "El teléfono debe tener al menos 10 caracteres"
  }),
  email: z.string().email({
    message: "El email no es válido"
  }),
  country: z.string().min(2, {
    message: "El país es requerido"
  })
});
