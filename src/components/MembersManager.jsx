import React, { useState } from "react";
import { useMembers } from "../context/MembersContext";

const allAreas = ["sonido", "camara", "textos", "transmision"];
const allDias = ["martes", "jueves", "domingo"];

export default function MemberManagement() {
  const { members, setMembers } = useMembers();
  const [newMember, setNewMember] = useState({
    nombre: "",
    areas: [],
    dias: [],
    activo: true,
  });

  const toggleActivo = (nombre) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.nombre === nombre ? { ...m, activo: !m.activo } : m
      )
    );
  };

  const toggleArea = (nombre, area) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.nombre === nombre
          ? {
              ...m,
              areas: m.areas.includes(area)
                ? m.areas.filter((a) => a !== area)
                : [...m.areas, area],
            }
          : m
      )
    );
  };

  const toggleDia = (nombre, dia) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.nombre === nombre
          ? {
              ...m,
              dias: m.dias.includes(dia)
                ? m.dias.filter((d) => d !== dia)
                : [...m.dias, dia],
            }
          : m
      )
    );
  };

  const handleAddMember = () => {
    if (!newMember.nombre.trim()) return;
    setMembers((prev) => [...prev, { ...newMember }]);
    setNewMember({ nombre: "", areas: [], dias: [], activo: true });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gestión de Miembros</h2>

      {/* Formulario para agregar nuevo miembro */}
      <div className="mb-6 border p-4 rounded bg-gray-100">
        <h3 className="font-semibold mb-2">Agregar nuevo miembro</h3>
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded w-full mb-2"
          value={newMember.nombre}
          onChange={(e) =>
            setNewMember({ ...newMember, nombre: e.target.value })
          }
        />

        <div className="mb-2">
          <p className="font-medium">Áreas:</p>
          {allAreas.map((area) => (
            <label key={area} className="mr-4">
              <input
                type="checkbox"
                checked={newMember.areas.includes(area)}
                onChange={() =>
                  setNewMember((prev) => ({
                    ...prev,
                    areas: prev.areas.includes(area)
                      ? prev.areas.filter((a) => a !== area)
                      : [...prev.areas, area],
                  }))
                }
              />{" "}
              {area}
            </label>
          ))}
        </div>

        <div className="mb-2">
          <p className="font-medium">Días:</p>
          {allDias.map((dia) => (
            <label key={dia} className="mr-4">
              <input
                type="checkbox"
                checked={newMember.dias.includes(dia)}
                onChange={() =>
                  setNewMember((prev) => ({
                    ...prev,
                    dias: prev.dias.includes(dia)
                      ? prev.dias.filter((d) => d !== dia)
                      : [...prev.dias, dia],
                  }))
                }
              />{" "}
              {dia}
            </label>
          ))}
        </div>

        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddMember}
        >
          Agregar
        </button>
      </div>

      {/* Listado de miembros */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Áreas</th>
            <th className="border p-2">Días</th>
            <th className="border p-2">Activo</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.nombre}>
              <td className="border p-2">{m.nombre}</td>
              <td className="border p-2">
                {allAreas.map((area) => (
                  <label key={area} className="mr-2">
                    <input
                      type="checkbox"
                      checked={m.areas.includes(area)}
                      onChange={() => toggleArea(m.nombre, area)}
                      disabled={!m.activo}
                    />{" "}
                    {area}
                  </label>
                ))}
              </td>
              <td className="border p-2">
                {allDias.map((dia) => (
                  <label key={dia} className="mr-2">
                    <input
                      type="checkbox"
                      checked={m.dias.includes(dia)}
                      onChange={() => toggleDia(m.nombre, dia)}
                      disabled={!m.activo}
                    />{" "}
                    {dia}
                  </label>
                ))}
              </td>
              <td className="border p-2 text-center">
                <button
                  className={`px-3 py-1 rounded ${
                    m.activo ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                  onClick={() => toggleActivo(m.nombre)}
                >
                  {m.activo ? "Activo" : "Inactivo"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
