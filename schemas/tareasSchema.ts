import { z } from "zod";

export const tareaSchema = z.object({
  titulo: z
    .string()
    .min(1, "El título es obligatorio.")
    .max(12, "El título no puede exceder los 12 caracteres."),

  descripcion: z
    .string()
    .min(1, "La descripción es obligatoria.")
    .max(50, "La descripción no puede exceder los 50 caracteres."),

  dia: z.string().refine((v) => /^\d+$/.test(v) && +v >= 1 && +v <= 31, {
    message: "El día debe estar entre 1 y 31.",
  }),

  mes: z.string().refine((v) => /^\d+$/.test(v) && +v >= 1 && +v <= 12, {
    message: "El mes debe estar entre 1 y 12.",
  }),
});

export type TareaFormulario = z.infer<typeof tareaSchema>;
