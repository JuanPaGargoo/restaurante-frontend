function Sidebar() {
  return (
    <aside className="w-[104px] bg-gray-800 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/path-to-logo.png" // Reemplaza con la ruta de tu logo
          alt="Logo"
          className="w-12 h-12"
        />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-8">
        <button className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
          <img
            src="/path-to-home-icon.png" // Reemplaza con la ruta de tu ícono de inicio
            alt="Home"
            className="w-6 h-6"
          />
        </button>
        <button className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
          <img
            src="/path-to-settings-icon.png" // Reemplaza con la ruta de tu ícono de configuración
            alt="Settings"
            className="w-6 h-6"
          />
        </button>
      </nav>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Logout Icon */}
      <button className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
        <img
          src="/path-to-logout-icon.png" // Reemplaza con la ruta de tu ícono de logout
          alt="Logout"
          className="w-6 h-6"
        />
      </button>
    </aside>
  )
}

export default Sidebar