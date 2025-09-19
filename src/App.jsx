import React from "react";
import { MembersProvider } from "./context/MembersContext";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MembersProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold">Programación comunicaciones 📹</h1>
            <p className="text-blue-100 mt-2">Programación equipo de comunicaciones MMM Boston - Medellín</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Navigation />
        </main>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </MembersProvider>
  );
}

export default App;
