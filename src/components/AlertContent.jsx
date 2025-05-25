import { useState } from "react";

const orders = [
  { id: "12345", time: "03:30pm", table: 2, status: "Delivered", total: 560 },
  { id: "12346", time: "03:45pm", table: 5, status: "Delivered", total: 400 },
  { id: "12347", time: "04:22pm", table: 1, status: "Ready", total: 270 },
  { id: "12348", time: "04:30pm", table: 3, status: "In preparation", total: 490 },
  { id: "12349", time: "04:47pm", table: 7, status: "In preparation", total: 200 },
];

// Ejemplo de alertas
const alerts = [
  { id: 1, message: "New Message", detail: "Table 1 Need Help!" },
  { id: 2, message: "New Message", detail: "Table 5 Need Help!" },
  { id: 3, message: "New Message", detail: "Table 3 Need Help!" },
];

function AlertContent() {
  const [filter, setFilter] = useState("all");

  // Opcional: Filtrado por status
  const filteredOrders = filter === "all"
    ? orders
    : orders.filter(order => order.status === filter);

  return (
    <div className="flex gap-6 h-full p-6">
      {/* Main content */}
      <div className="flex-1 bg-[#23232b] rounded-xl p-6 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm">Tuesday 2 Feb, 2021</p>
          </div>
          <div className="text-gray-400 text-sm">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <hr className="border-gray-700 my-4" />

        {/* Order Report */}
        <div className="bg-[#23232b] rounded-xl p-6 shadow-lg flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Order Report</h2>
            <button
              className="flex items-center border border-gray-500 rounded-lg px-4 py-2 text-gray-200 hover:bg-gray-700 transition"
              onClick={() => setFilter(filter === "all" ? "In preparation" : "all")}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h3.28a1 1 0 01.948.684l.326.98A1 1 0 009.447 6h5.106a1 1 0 00.948-.684l.326-.98A1 1 0 0116.72 3H20a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v13a2 2 0 002 2h12a2 2 0 002-2V7" />
              </svg>
              Filter by Status
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-2 font-semibold">Order</th>
                  <th className="py-2 px-2 font-semibold">Admission Time</th>
                  <th className="py-2 px-2 font-semibold">Table</th>
                  <th className="py-2 px-2 font-semibold">Status</th>
                  <th className="py-2 px-2 font-semibold">Total</th>
                  <th className="py-2 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-2 px-2">{order.id}</td>
                    <td className="py-2 px-2">{order.time}</td>
                    <td className="py-2 px-2">{order.table}</td>
                    <td className="py-2 px-2">
                      <span className={
                        order.status === "Delivered"
                          ? "font-bold text-white"
                          : order.status === "Ready"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-2">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold shadow-md transition">
                        Confirm Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Notes section */}
      <div className="w-[350px] bg-[#23232b] rounded-xl p-6 shadow-lg flex flex-col">
        <h2 className="text-lg font-bold text-white mb-2">Alerts</h2>
        <hr className="border-gray-700 mb-4" />
        <div className="flex flex-col gap-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className="flex items-start gap-4 bg-[#2d2e36] rounded-lg p-4 shadow-md"
            >
              <svg
                className="w-7 h-7 text-gray-300 mt-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.73 21a2 2 0 01-3.46 0M12 19v-1m-6-5V9a6 6 0 1112 0v4a2 2 0 002 2h-1a2 2 0 01-2 2H7a2 2 0 01-2-2H4a2 2 0 002-2z"
                />
              </svg>
              <div>
                <div className="text-white font-medium">{alert.message}</div>
                <div className="text-gray-400">{alert.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlertContent;