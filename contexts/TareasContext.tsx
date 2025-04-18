import { createContext, useContext, useState, ReactNode } from "react";

type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  dia: string;
  mes: string;
  completada: boolean;
};

type TareasContextType = {
  tareas: Tarea[];
  agregarTarea: (tarea: Tarea) => void;
  eliminarTarea: (id: number) => void;
  completarTarea: (id: number) => void;
};

const TareasContext = createContext<TareasContextType | undefined>(undefined);

export const useTareas = () => {
  const context = useContext(TareasContext);
  if (!context)
    throw new Error("useTareas debe usarse dentro de un TareasProvider");
  return context;
};

export function TareasProvider({ children }: { children: ReactNode }) {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const agregarTarea = (tarea: Tarea) => {
    setTareas((prev) => [...prev, tarea]);
  };

  const eliminarTarea = (id: number) => {
    setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
  };

  const completarTarea = (id: number) => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  return (
    <TareasContext.Provider
      value={{ tareas, agregarTarea, eliminarTarea, completarTarea }}
    >
      {children}
    </TareasContext.Provider>
  );
}
