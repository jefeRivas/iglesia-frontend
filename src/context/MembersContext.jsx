import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const defaultMembers = {
  Jeferson: {
    areas: ["sonido", "camara", "textos", "transmision"],
    dias: ["domingo"],
    activo: true,
  },
  Julian: {
    areas: ["sonido", "camara", "textos", "transmision"],
    dias: ["domingo"],
    activo: true,
  },
  Camilo: {
    areas: ["sonido", "camara", "textos", "transmision"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Wilder: {
    areas: ["camara"],
    dias: ["jueves"],
    activo: true,
  },
  Maritza: {
    areas: ["camara", "textos"],
    dias: ["jueves", "domingo"],
    activo: true,
  },
  Sebastian: {
    areas: ["camara", "textos", "transmision"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Andres: {
    areas: ["textos", "sonido", "camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Jose: {
    areas: ["textos", "transmision", "sonido", "camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Angelica: {
    areas: ["textos"],
    dias: ["domingo"],
    activo: true,
  },
  "Juan Carlos": {
    areas: ["camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Mirlan: {
    areas: ["textos"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Vanesa: {
    areas: ["sonido", "transmision"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Roselis: {
    areas: ["textos"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  Robert: {
    areas: ["textos", "camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  }
};

const MembersContext = createContext();

export function MembersProvider({ children }) {
  const [members, setMembers] = useState(() => {
    try {
      const stored = localStorage.getItem("members");
      if (!stored || stored === "undefined") {
        localStorage.setItem("members", JSON.stringify(defaultMembers));
        return defaultMembers;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error loading members:", error);
      return defaultMembers;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("members", JSON.stringify(members));
    } catch (error) {
      console.error("Error saving members:", error);
      toast.error("Error al guardar los cambios");
    }
  }, [members]);

  return (
    <MembersContext.Provider value={{ members, setMembers }}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used within a MembersProvider");
  }
  return context;
}
