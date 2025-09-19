import React, { useState } from "react";
import ManualScheduler from "./ManualScheduler";
import AutoScheduler from "./AutoScheduler";
import MemberManagement from "./MembersManager";

export default function Navigation() {
  const [activeScreen, setActiveScreen] = useState("menu");

  const renderScreen = () => {
    switch (activeScreen) {
      case "manual":
        return <ManualScheduler setPantalla={setActiveScreen} />;
      case "auto":
        return <AutoScheduler setPantalla={setActiveScreen} />;
      case "members":
        return <MemberManagement setPantalla={setActiveScreen} />;
      default:
        return (
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center items-center min-h-[50vh]">
            <button
              onClick={() => setActiveScreen("manual")}
              className="w-full md:w-64 p-6 text-xl bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Programación Manual
            </button>
            <button
              onClick={() => setActiveScreen("auto")}
              className="w-full md:w-64 p-6 text-xl bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              Programación Automática
            </button>
            <button
              onClick={() => setActiveScreen("members")}
              className="w-full md:w-64 p-6 text-xl bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
            >
              Gestión de Miembros
            </button>
          </div>
        );
    }
  };

  return renderScreen();
}
