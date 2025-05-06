import { useState } from "react";

function Sidebar() {
  const [activeIcon, setActiveIcon] = useState(null);

  return (
    //  <aside className="w-[104px] bg-azulCarbon flex flex-col items-center py-4">
      <aside className="w-[100px] border-r-4 border-azulCarbon bg-azulCarbon flex flex-col items-center py-4 rounded-r-lg">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/images/logo1.svg" // Reemplaza con la ruta de tu logo
          alt="Logo"
          className="w-12 h-12"
        />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-8">
      {/* Ícono Home */}
      <button
          onClick={() => setActiveIcon("home")}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
            activeIcon === "home" 
              ? "bg-rojoBrillante shadow-[4px_4px_12px_0px_rgba(255,255,255,0.3)]" // Solo sombra blanca
              : "bg-azulCarbon hover:bg-azulOscuro"
          }`}
        >
          <div className={`w-6 h-6 transition-colors duration-300 ${
            activeIcon === "home" ? "text-white" : "text-rojoBrillante"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor">
              <path d="M2 11.5h2a.5.5 0 00.5-.5V8a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v3a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V6.5h.389a.496.496 0 00.413-.838L6.422.681a.59.59 0 00-.844 0L.698 5.662a.496.496 0 00.413.838H1.5V11a.5.5 0 00.5.5z" />
            </svg>
          </div>
        </button>
        {/* Ícono Settings */}
        <button
          onClick={() => setActiveIcon("settings")}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
            activeIcon === "settings" 
              ? "bg-rojoBrillante shadow-[4px_4px_12px_0px_rgba(255,255,255,0.3)]" 
              : "bg-azulCarbon hover:bg-azulOscuro"
          }`}
        >
          <div className={`w-6 h-6 transition-colors duration-300 ${
            activeIcon === "settings" ? "text-white" : "text-rojoBrillante"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>
          </div>
        </button>
      </nav>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Logout Icon */}
      <button
        className="w-12 h-12 bg-azulCarbon rounded-lg flex items-center justify-center"
        onClick={() => console.log("Cerrar sesión")} // Aquí iría tu lógica de logout
      >
        <div className="text-rojoBrillante w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </div>
      </button>
    </aside>
  );
}

export default Sidebar