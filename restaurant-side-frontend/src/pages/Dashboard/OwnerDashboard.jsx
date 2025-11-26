// src/components/Dashboard/Dashboard.jsx
import ARViewStatistics from "./ArViewStatistics";
import FeedbackSummary from "./FeedbackSummary";
import ModelInsights from "./ModelsInsights";
import Sidebar from "./Sidebar";
import TableOrdersOverview from "./TableOrderOverview";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0c0f14] text-white flex relative">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => document.dispatchEvent(new Event("openSidebar"))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
            </svg>
          </button>

          <h1 className="text-lg lg:text-2xl font-bold">
            Restaurant Dashboard
          </h1>
        </div>

        {/* AR + Model Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

          {/* AR View Statistics - 2/3 width on large screens */}
          <div className="lg:col-span-2 h-full">
            <ARViewStatistics />
          </div>

          {/* Model Insights - 1/3 width */}
          <div className="lg:col-span-1 h-full">
            <ModelInsights />
          </div>

        </div>

            {/* Table Orders & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <TableOrdersOverview />
        <FeedbackSummary />
      </div>

      </div>
    </div>
  );
}
