import React, { useState } from "react";
import { useMembers } from "../context/MembersContext";
import { toast } from "react-toastify";
import { validateMember } from "../utils/validation";

const allAreas = ["sonido", "camara", "textos", "transmision"];
const allDias = ["martes", "jueves", "domingo"];

export default function MemberManagement({ setPantalla }) {
  const { members, setMembers } = useMembers();
  const [newMember, setNewMember] = useState({
    nombre: "",
    areas: [],
    dias: [],
    activo: true,
  });

  const toggleActivo = (nombre) => {
    setMembers((prev) => ({
      ...prev,
      [nombre]: { ...prev[nombre], activo: !prev[nombre].activo }
    }));
  };

  const toggleArea = (nombre, area) => {
    setMembers((prev) => ({
      ...prev,
      [nombre]: {
        ...prev[nombre],
        areas: prev[nombre].areas.includes(area)
          ? prev[nombre].areas.filter((a) => a !== area)
          : [...prev[nombre].areas, area]
      }
    }));
  };

  const toggleDia = (nombre, dia) => {
    setMembers((prev) => ({
      ...prev,
      [nombre]: {
        ...prev[nombre],
        dias: prev[nombre].dias.includes(dia)
          ? prev[nombre].dias.filter((d) => d !== dia)
          : [...prev[nombre].dias, dia]
      }
    }));
  };

  const handleAddMember = () => {
    const errors = validateMember(newMember);
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }
    setMembers((prev) => ({
      ...prev,
      [newMember.nombre]: {
        areas: newMember.areas,
        dias: newMember.dias,
        activo: true
      }
    }));
    setNewMember({ nombre: "", areas: [], dias: [], activo: true });
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setPantalla('menu')}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        ← Volver
      </button>
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
      <div className="overflow-x-auto">
        <table className="w-full border min-w-[750px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Áreas</th>
              <th className="border p-2">Días</th>
              <th className="border p-2">Activo</th>
            </tr>
          </thead>
        <tbody>
          {Object.entries(members).map(([nombre, m]) => (
            <tr key={nombre}>
              <td className="border p-2">{nombre}</td>
              <td className="border p-2">
                {allAreas.map((area) => (
                  <label key={area} className="mr-2">
                    <input
                      type="checkbox"
                      checked={m.areas.includes(area)}
                      onChange={() => toggleArea(nombre, area)}
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
                      onChange={() => toggleDia(nombre, dia)}
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
                  onClick={() => toggleActivo(nombre)}
                >
                  {m.activo ? "Activo" : "Inactivo"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
