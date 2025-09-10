import React, { useState } from "react";
import { useMembers } from "../context/MembersContext";

const areas = ["Transmisión", "Sonido", "Textos", "Cámara1", "Cámara2"];
const dias = ["Martes", "Jueves", "Domingo"];

export default function ManualScheduler() {
  const { members } = useMembers();
  //const [schedule, setSchedule] = useState({});

  const dias = ["martes", "jueves", "domingo"];
  const areas = ["transmision", "sonido", "textos", "camara1", "camara2"];

  const [schedule, setSchedule] = useState(
    dias.reduce((acc, dia) => {
      acc[dia] = {};
      areas.forEach((area) => (acc[dia][area] = ""));
      return acc;
    }, {})
  );

  // 👉 Personas ya seleccionadas en toda la tabla
  const seleccionados = new Set(
    dias.flatMap((d) => areas.map((a) => schedule[d][a])).filter(Boolean)
  );

  // 👉 Filtrar miembros disponibles según reglas
  const getDisponibles = (dia, area) => {
    return members.filter((m) => {
      if (!m.activo) return false;
      /*if (seleccionados.has(m.nombre) && schedule[dia][area] !== m.nombre) {
        return false;
      }*/
      if (!m.dias.includes(dia)) return false;
      if (
        area.startsWith("camara") &&
        !m.areas.includes("camara")
      ) {
        return false;
      }
      if (
        !area.startsWith("camara") &&
        !m.areas.includes(area)
      ) {
        return false;
      }
      return true;
    });
  };

  // 👉 Cambiar asignación en una celda
  const handleChange = (dia, area, value) => {
    setSchedule((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [area]: value,
      },
    }));
  };

  // 👉 Exportar programación
  const exportar = () => {
    console.log("Programación manual:", schedule);
    alert("Programación exportada (ver consola)");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Programación Manual</h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Área</th>
              {dias.map((dia) => (
                <th key={dia} className="border border-gray-400 px-4 py-2">
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area}>
                <td className="border border-gray-400 px-4 py-2 font-semibold">
                  {area}
                </td>
                {dias.map((dia) => (
                  <td key={dia} className="border border-gray-400 px-4 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={schedule[dia][area]}
                      onChange={(e) =>
                        handleChange(dia, area, e.target.value)
                      }
                    >
                      <option value="">-- Seleccionar --</option>
                      {getDisponibles(dia, area).map((m) => (
                        <option key={m.nombre} value={m.nombre}>
                          {m.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={exportar}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Exportar Programación
      </button>
    </div>
  );
}