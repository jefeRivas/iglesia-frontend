import React, { useState } from "react";
import { useMembers } from "../context/MembersContext";

export default function AutoScheduler() {
    
  const { members } = useMembers();
    const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSchedule = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convertir lista en objeto con clave = nombre
      const payload = members.filter((m) => m.activo) // solo los activos
        .reduce((acc, m) => {
          acc[m.nombre] = {
            areas: m.areas,
            dias: m.dias,
            activo: m.activo,
          };
          return acc;
        }, {});

      const response = await fetch("https://iglesia-backend-7jen.onrender.com/programar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload))

      if (!response.ok) {
        throw new Error("Error en el backend");
      }

      
      const data = await response.json();
      setSchedule(data);
    } catch (err) {
      console.error("Error generando programación:", err);
      setError("No se pudo generar la programación. Revisa el backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Programación Automática</h1>

      <button
        onClick={generateSchedule}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar Programación"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {schedule && (
        <div className="mt-6 overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-400 w-full text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Área</th>
                <th className="border border-gray-400 px-4 py-2">Martes</th>
                <th className="border border-gray-400 px-4 py-2">Jueves</th>
                <th className="border border-gray-400 px-4 py-2">Domingo</th>
              </tr>
            </thead>
            <tbody>
              {["transmision", "sonido", "textos", "camara1", "camara2"].map(
                (area) => (
                  <tr key={area}>
                    <td className="border border-gray-400 px-4 py-2 font-semibold">
                      {area}
                    </td>
                    {["martes", "jueves", "domingo"].map((dia) => (
                      <td
                        key={dia}
                        className="border border-gray-400 px-4 py-2"
                      >
                        {schedule[dia]?.[area] || "-"}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
