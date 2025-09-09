import { useState } from "react";

export default function GestionMiembros() {
  // Estado inicial con todos los miembros que me pasaste
  const [miembros, setMiembros] = useState({
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
      areas: ["texto", "sonido", "camara"], // ojo, acá pusiste "texto" y no "textos"
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
    },
  });

  const [programacion, setProgramacion] = useState(null);
  const areasDisponibles = ["sonido", "camara", "textos", "transmision"];
  const diasDisponibles = ["martes", "jueves", "domingo"];

  // Cambiar estado activo/inactivo
  const toggleActivo = (nombre) => {
    setMiembros((prev) => ({
      ...prev,
      [nombre]: { ...prev[nombre], activo: !prev[nombre].activo },
    }));
  };

  // Cambiar selección de áreas
  const toggleArea = (nombre, area) => {
    setMiembros((prev) => {
      const persona = prev[nombre];
      const areas = persona.areas.includes(area)
        ? persona.areas.filter((a) => a !== area)
        : [...persona.areas, area];
      return { ...prev, [nombre]: { ...persona, areas } };
    });
  };

  // Cambiar selección de días
  const toggleDia = (nombre, dia) => {
    setMiembros((prev) => {
      const persona = prev[nombre];
      const dias = persona.dias.includes(dia)
        ? persona.dias.filter((d) => d !== dia)
        : [...persona.dias, dia];
      return { ...prev, [nombre]: { ...persona, dias } };
    });
  };

  // Exportar JSON con solo los activos y sin el campo "activo"
  const exportarJSON = () => {
    const filtrados = Object.fromEntries(
      Object.entries(miembros)
        .filter(([_, data]) => data.activo)
        .map(([nombre, { activo, ...resto }]) => [nombre, resto])
    );

    const blob = new Blob([JSON.stringify(filtrados, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "miembros.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // --------- FORMULARIO NUEVO MIEMBRO ----------
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoAreas, setNuevoAreas] = useState([]);
  const [nuevoDias, setNuevoDias] = useState([]);

  const toggleNuevoArea = (area) => {
    setNuevoAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleNuevoDia = (dia) => {
    setNuevoDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const agregarMiembro = () => {
    if (!nuevoNombre.trim()) {
      alert("Debes ingresar un nombre");
      return;
    }
    if (miembros[nuevoNombre]) {
      alert("Ese nombre ya existe en la lista");
      return;
    }

    setMiembros((prev) => ({
      ...prev,
      [nuevoNombre]: {
        areas: nuevoAreas,
        dias: nuevoDias,
        activo: true,
      },
    }));

    // limpiar formulario
    setNuevoNombre("");
    setNuevoAreas([]);
    setNuevoDias([]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Miembros</h1>

      {/* LISTADO DE MIEMBROS */}
      {Object.entries(miembros).map(([nombre, data]) => (
        <div
          key={nombre}
          className={`p-4 border rounded-lg shadow ${
            data.activo ? "bg-white" : "bg-gray-200"
          }`}
        >
          <h2 className="text-lg font-semibold">{nombre}</h2>

          <div className="mt-2">
            <h3 className="font-medium">Áreas:</h3>
            <div className="flex gap-2 flex-wrap">
              {areasDisponibles.map((area) => (
                <label key={area} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={data.areas.includes(area)}
                    onChange={() => toggleArea(nombre, area)}
                  />
                  {area}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <h3 className="font-medium">Días:</h3>
            <div className="flex gap-2 flex-wrap">
              {diasDisponibles.map((dia) => (
                <label key={dia} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={data.dias.includes(dia)}
                    onChange={() => toggleDia(nombre, dia)}
                  />
                  {dia}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => toggleActivo(nombre)}
            className={`mt-3 px-4 py-2 rounded text-white ${
              data.activo
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {data.activo ? "Inactivar" : "Activar"}
          </button>
        </div>
      ))}

      {/* FORMULARIO NUEVO MIEMBRO */}
      <div className="p-4 border rounded-lg shadow bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Agregar Nuevo Miembro</h2>

        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nombre del miembro"
          className="border p-2 rounded w-full mb-3"
        />

        <div className="mb-3">
          <h3 className="font-medium">Áreas:</h3>
          <div className="flex gap-2 flex-wrap">
            {areasDisponibles.map((area) => (
              <label key={area} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={nuevoAreas.includes(area)}
                  onChange={() => toggleNuevoArea(area)}
                />
                {area}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <h3 className="font-medium">Días:</h3>
          <div className="flex gap-2 flex-wrap">
            {diasDisponibles.map((dia) => (
              <label key={dia} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={nuevoDias.includes(dia)}
                  onChange={() => toggleNuevoDia(dia)}
                />
                {dia}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={agregarMiembro}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      {/* EXPORTAR JSON */}
      <button
        onClick={exportarJSON}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700"
      >
        Exportar JSON
      </button>
      {/* Botón Generar Programación */}
<div className="mt-6">
  <button
    onClick={async () => {
      // Filtrar miembros activos y quitar el campo "activo"
      const filtrados = Object.fromEntries(
        Object.entries(miembros)
          .filter(([_, data]) => data.activo)
          .map(([nombre, { activo, ...resto }]) => [nombre, resto])
      );

      try {
        const resp = await fetch("https://iglesia-backend-7jen.onrender.com/programar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filtrados),
        });
        const data = await resp.json();
        setProgramacion(data); // guardamos la programación en el estado
      } catch (err) {
        console.error("Error generando programación:", err);
      }
    }}
    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
  >
    Generar Programación
  </button>
  {programacion && (
  <div className="mt-6 bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-bold mb-3">Programación esta semana</h2>
    <table className="w-full text-center border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Área</th>
          {["martes", "jueves", "domingo"].map((dia) => (
            <th key={dia} className="border p-2 capitalize">{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {["transmision", "sonido", "textos", "camara1", "camara2"].map((area) => (
        <tr key={area}>
            <td className="border p-2">{area}
                
            </td>

            {["martes", "jueves", "domingo"].map((dia) => (
              <td key={dia} className="border p-2">
                {programacion[dia] && programacion[dia][area]
                  ? programacion[dia][area].join(", ")
                  : "SIN ASIGNAR"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


</div>

    </div>
    
  );
}
