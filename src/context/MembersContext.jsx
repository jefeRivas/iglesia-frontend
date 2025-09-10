import React, { createContext, useContext, useState, useEffect } from "react";

// Lista inicial de miembros (los que me pasaste)
const initialMembers = [
  {
    nombre: "Jeferson",
    areas: ["sonido", "camara", "textos", "transmision"],
    dias: ["domingo"],
    activo: true,
  },
  {
    nombre: "Julian",
    areas: ["sonido", "camara", "textos", "transmision"],
    dias: ["domingo"],
    activo: true,
  },
  {
    nombre: "Camilo",
    areas: ["sonido", "camara", "textos", "transmision"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Wilder",
    areas: ["camara"],
    dias: ["jueves"],
    activo: true,
  },
  {
    nombre: "Maritza",
    areas: ["camara", "textos"],
    dias: ["jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Sebastian",
    areas: ["camara", "textos", "transmision"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Andres",
    areas: ["texto", "sonido", "camara"], // 👀 revisa: pusiste "texto" en vez de "textos"
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Jose",
    areas: ["textos", "transmision", "sonido", "camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Angelica",
    areas: ["textos"],
    dias: ["domingo"],
    activo: true,
  },
  {
    nombre: "Juan Carlos",
    areas: ["camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Mirlan",
    areas: ["textos"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Vanesa",
    areas: ["sonido", "transmision"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Roselis",
    areas: ["textos"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
  {
    nombre: "Robert",
    areas: ["textos", "camara"],
    dias: ["martes", "jueves", "domingo"],
    activo: true,
  },
];

const MembersContext = createContext();

export function MembersProvider({ children }) {
  const [members, setMembers] = useState(() => {
    const stored = localStorage.getItem("miembros");
    return stored ? JSON.parse(stored) : initialMembers;
  });

  useEffect(() => {
    localStorage.setItem("miembros", JSON.stringify(members));
  }, [members]);

  return (
    <MembersContext.Provider value={{ members, setMembers }}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  return useContext(MembersContext);
}
