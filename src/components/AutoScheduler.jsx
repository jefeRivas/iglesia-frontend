import React, { useState } from "react";
import { useMembers } from "../context/MembersContext";
import { toast } from "react-toastify";
import { AREAS, DIAS, AREAS_DISPLAY } from "../constants/schedule";
import { downloadScheduleAsImage } from "../utils/downloadImage";

export default function AutoScheduler({ setPantalla }) {
  const { members } = useMembers();
  const [loading, setLoading] = useState(false);
  const [programacion, setProgramacion] = useState(null);
  const dias = Object.values(DIAS);

  const generateSchedule = async () => {
    try {
      setLoading(true);
      // Filtrar miembros activos y quitar el campo "activo"
      const miembrosFiltrados = Object.fromEntries(
        Object.entries(members)
          .filter(([_, data]) => data.activo)
          .map(([nombre, data]) => [
            nombre,
            {
              areas: data.areas,
              dias: data.dias
            }
          ])
      );

      const response = await fetch("https://iglesia-backend-7jen.onrender.com/programar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(miembrosFiltrados),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setProgramacion(data);
      toast.success("Programación generada exitosamente");
    } catch (error) {
      console.error("Error generando programación:", error);
      toast.error("Error al generar la programación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setPantalla('menu')}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        ← Volver
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Programación Automática</h1>
        <div className="space-x-4">
          {programacion && (
            <button
              onClick={() => downloadScheduleAsImage('auto-schedule-table', 'programacion-automatica')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Descargar Imagen
            </button>
          )}
          <button
            onClick={generateSchedule}
            disabled={loading}
            className={`px-4 py-2 bg-green-600 text-white rounded-lg shadow transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Generando..." : "Generar"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Generando programación...</p>
        </div>
      ) : programacion ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Programación para esta semana</h2>
          <div className="overflow-x-auto">
            <table id="auto-schedule-table" className="w-full border-collapse border-2 border-gray-800 min-w-[750px]">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-800 px-6 py-3 text-lg font-bold">Área</th>
                  {dias.map((dia) => (
                    <th key={dia} className="border-2 border-gray-800 px-6 py-3 text-lg font-bold">
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["transmision", "sonido", "textos", "camara1", "camara2"].map((area) => (
                  <tr key={area}>
                    <td className="border-2 border-gray-800 px-6 py-3 text-lg font-bold bg-gray-100">
                      {area === "camara1" ? "Cámara 1" :
                       area === "camara2" ? "Cámara 2" :
                       area.charAt(0).toUpperCase() + area.slice(1)}
                    </td>
                    {dias.map((dia) => (
                      <td key={dia} className="border-2 border-gray-800 px-6 py-3">
                        {programacion[dia]?.[area]?.[0] || "SIN ASIGNAR"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <p>Presiona el botón para generar una programación automática</p>
        </div>
      )}
    </div>
  );
}
