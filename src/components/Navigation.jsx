import React, { useState } from "react";
import MembersManager from "./MembersManager";
import AutoScheduler from "./AutoScheduler";
import ManualScheduler from "./ManualScheduler";

export default function Navigation() {
  const [view, setView] = useState("members");

  return (
    <div>
      <nav className="flex space-x-4 p-4 bg-gray-200">
        <button onClick={() => setView("members")} className="px-4 py-2 bg-blue-500 text-white rounded">
          Gestión de Miembros
        </button>
        <button onClick={() => setView("auto")} className="px-4 py-2 bg-green-500 text-white rounded">
          Programación Automática
        </button>
        <button onClick={() => setView("manual")} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Programación Manual
        </button>
      </nav>

      {view === "members" && <MembersManager />}
      {view === "auto" && <AutoScheduler />}
      {view === "manual" && <ManualScheduler />}
    </div>
  );
}
