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
  fecha: z.date().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "La fecha debe ser hoy o posterior."),
});

export type TareaFormulario = z.infer<typeof tareaSchema>;
