import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import OrderSummary from './components/OrderSummary'

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <MainContent />
      <OrderSummary />
    </div>
  )
}

export default App
