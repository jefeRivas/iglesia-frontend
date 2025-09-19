import React, { useState, useMemo } from "react";
import { useMembers } from "../context/MembersContext";
import { AREAS, DIAS, AREAS_DISPLAY } from "../constants/schedule";
import { toast } from "react-toastify";
import { downloadScheduleAsImage } from "../utils/downloadImage";

export default function ManualScheduler({ setPantalla }) {
  const { members } = useMembers();
  const dias = Object.values(DIAS);
  const areas = Object.values(AREAS);

  // Inicializar programación
  const [schedule, setSchedule] = useState(() => {
    try {
      const savedSchedule = localStorage.getItem("manual_schedule");
      if (savedSchedule) {
        return JSON.parse(savedSchedule);
      }
    } catch (error) {
      console.error("Error loading saved schedule:", error);
    }

    return dias.reduce((acc, dia) => {
      acc[dia] = {};
      areas.forEach((area) => (acc[dia][area] = ""));
      return acc;
    }, {});
  });

  const [loading, setLoading] = useState(false);

  // Memorizar personas seleccionadas
  const seleccionados = useMemo(() => {
    return new Set(
      dias.flatMap((d) => areas.map((a) => schedule[d][a])).filter(Boolean)
    );
  }, [schedule, dias, areas]);

  // Obtener miembros disponibles con validación
  const getDisponibles = useMemo(
    () => (dia, area) => {
      return Object.entries(members)
        .filter(([_, m]) => {
          if (!m.activo) return false;
          if (!m.dias?.includes(dia)) return false;

          if (area.startsWith("camara")) {
            return m.areas?.includes("camara");
          }
          return m.areas?.includes(area);
        })
        .map(([nombre]) => ({ nombre }));
    },
    [members]
  );

  // Manejar cambios con validación
  const handleChange = (dia, area, value) => {
    if (!value) return; // Si no hay valor seleccionado, retornar

    // Contar en cuántos días está asignada la persona
    const diasAsignados = dias.filter((d) =>
      Object.values(schedule[d]).includes(value)
    );

    // Verificar si ya está asignada en el mismo día
    const asignadoMismoDia = Object.values(schedule[dia]).includes(value);

    if (asignadoMismoDia) {
      if (
        !confirm(
          "Esta persona ya está asignada en este mismo día. ¿Desea continuar?"
        )
      ) {
        return;
      }
    } else if (diasAsignados.length >= 2) {
      if (
        !confirm(
          "Esta persona ya está asignada en 2 días diferentes. ¿Desea continuar?"
        )
      ) {
        return;
      }
    }

    setSchedule((prev) => {
      const newSchedule = {
        ...prev,
        [dia]: {
          ...prev[dia],
          [area]: value,
        },
      };

      // Guardar en localStorage
      try {
        localStorage.setItem("manual_schedule", JSON.stringify(newSchedule));
      } catch (error) {
        console.error("Error saving schedule:", error);
      }

      return newSchedule;
    });
  };

  const getMiembrosActivos = () => {
    return Object.entries(members)
      .filter(([_, data]) => data.activo && data.areas.length > 0)
      .map(([nombre]) => nombre);
  };

  // Exportar programación
  const exportar = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        "https://iglesia-backend-7jen.onrender.com/guardar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(schedule),
        }
      );

      if (!resp.ok) throw new Error("Error al guardar la programación");

      toast.success("Programación guardada exitosamente");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error al guardar la programación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6" role="main">
      <button
        onClick={() => setPantalla("menu")}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        ← Volver
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Programación Manual</h1>
        <div className="space-x-4">
          <button
            onClick={() =>
              downloadScheduleAsImage("schedule-table", "programacion-manual")
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Descargar Imagen
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Programación para esta semana
      </h2>

      <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-md">
        <table
          id="schedule-table"
          className="table-auto border-collapse border-2 border-gray-800 w-full text-center bg-white"
          role="grid"
          style={{ minWidth: "800px" }}
        >
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border-2 border-gray-800 px-6 py-3 text-lg font-bold">
                Área
              </th>
              {dias.map((dia) => (
                <th
                  key={dia}
                  className="border-2 border-gray-800 px-6 py-3 text-lg font-bold"
                  scope="col"
                >
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area}>
                <td className="border-2 border-gray-800 px-6 py-3 text-lg font-bold bg-gray-100">
                  {AREAS_DISPLAY[area]}
                </td>
                {dias.map((dia) => (
                  <td key={dia} className="border-2 border-gray-800 px-6 py-3">
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={schedule[dia][area]}
                      onChange={(e) => handleChange(dia, area, e.target.value)}
                      aria-label={`Seleccionar persona para ${
                        AREAS_DISPLAY[area]
                      } el día ${dia}`}
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
    </div>
  );
}