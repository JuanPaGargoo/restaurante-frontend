import { useState } from "react";
import { useUserType } from "../context/UserTypeContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { userType } = useUserType();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setActiveIcon("settings");
    setShowModal(true);
    setPassword("");
    setError("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "2330") {
      setShowModal(false);
      setError("");
      setTimeout(() => navigate("/configuracion"), 100);
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <aside className="w-[100px] border-r-4 border-azulCarbon bg-azulCarbon flex flex-col items-center py-4 rounded-r-lg">
      {/* Logo */}
      <div className="mb-8 ml-0 mt-2">
        <img
          src="/images/logo1.svg"
          alt="Logo"
          className="w-16 h-16"
        />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-8 w-[100%] pl-7">
        {/* Ícono Home */}
        <div className={`p-4 pl-3 rounded-xl transition-all duration-300 w-[140%] flex justify-start mb-2 
           ${activeIcon === "home" ? "bg-grisAcero" : ""}`}>
          <button
            onClick={() => {
              setActiveIcon("home");
              if (userType === "cocina") {
                navigate("/cocina");
              } else {
                navigate("/");
              }
            }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
              activeIcon === "home" 
                ? "bg-rojoBrillante"
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
        </div>
        {/* Ícono Alertas solo para "personal" */}
        {userType === "personal" && (
          <div className={`p-4 pl-3 rounded-xl transition-all duration-300 w-[140%] flex justify-start mb-2
           ${activeIcon === "alertas" ? "bg-grisAcero" : ""}`}>
            <button
              onClick={() => {
                setActiveIcon("alertas");
                navigate("/alertas");
              }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                activeIcon === "alertas"
                  ? "bg-rojoBrillante"
                  : "bg-azulCarbon hover:bg-azulOscuro"
              }`}
            >
              <div className={`w-6 h-6 transition-colors duration-300 ${
                activeIcon === "alertas" ? "text-white" : "text-rojoBrillante"
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </div>
            </button>
          </div>
        )}
        {/* Ícono Settings */}
        <div className={`p-4 pl-3 rounded-xl transition-all duration-300 w-[140%] flex justify-start 
           ${activeIcon === "settings" ? "bg-grisAcero" : ""}`}>
          <button
            onClick={handleSettingsClick}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
              activeIcon === "settings" 
                ? "bg-rojoBrillante"
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
        </div>
      </nav>

      {/* Modal de contraseña */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-80 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Configuración</h2>
            <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col items-center">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full text-gray-800"
                autoFocus
              />
              {error && <div className="text-red-600 mb-2">{error}</div>}
              <button
                type="submit"
                className="bg-rojoBrillante text-white px-4 py-2 rounded w-full font-bold"
              >
                Entrar
              </button>
              <button
                type="button"
                className="mt-2 text-gray-500 underline"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Logout Icon */}
      <button
        className="w-12 h-12 bg-azulCarbon rounded-lg flex items-center justify-center"
        onClick={() => console.log("Cerrar sesión")}
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

export default Sidebar;