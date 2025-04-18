import { createContext, useContext, useState, ReactNode } from "react";

type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
};

type TareasContextType = {
  tareas: Tarea[];
  agregarTarea: (tarea: Tarea) => void;
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
    setTareas((prev) => [...prev, { ...tarea, id: Date.now() }]);
  };

  return (
    <TareasContext.Provider value={{ tareas, agregarTarea }}>
      {children}
    </TareasContext.Provider>
  );
}
