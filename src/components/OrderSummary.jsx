function OrderSummary() {
  return (
    <aside className="w-[409px] bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Orders #34562</h2>
      <div className="space-y-4">
        {/* Example Order Item */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">Spicy seasoned seafood noodles</h3>
            <p className="text-gray-400">$2.29</p>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              className="w-12 bg-gray-700 text-white text-center rounded"
              defaultValue={2}
            />
            <button className="text-red-500 ml-2">🗑</button>
          </div>
        </div>
        {/* Repeat similar blocks for other order items */}
      </div>

      <div className="mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$21.03</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">$21.03</span>
        </div>
        <button className="w-full bg-red-500 text-white py-2 mt-4 rounded">
          Confirm Order
        </button>
      </div>
    </aside>
  )
}

export default OrderSummary