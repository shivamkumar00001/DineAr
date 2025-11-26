// src/components/Dashboard/ARViewStatistics.jsx

export default function ARViewStatistics() {
  return (
    <div
      className="relative h-full group bg-[#0D1017] border border-[#1F2532]
      rounded-2xl p-6 shadow-[0_0_25px_-10px_rgba(0,0,0,0.6)]
      transition-all duration-500 hover:shadow-[0_0_37px_-10px_rgba(30,58,138,0.6)]"
    >

       <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>


      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">AR View Statistics</h2>
      </div>

      {/* Stats Info */}
      <div className="flex gap-10 mb-5">
        <div>
          <p className="text-xs text-gray-400">Total Views</p>
          <p className="text-xl font-bold text-blue-400">2,450</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Engagement Score</p>
          <p className="text-xl font-bold text-green-400">89%</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-48 bg-[#111827] border border-gray-700 rounded-lg flex items-center justify-center text-gray-600 text-sm">
        Chart Coming Soon 📊
      </div>

    </div>
  );
}
