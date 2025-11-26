// src/components/Dashboard/ModelInsights.jsx

const topModels = [
  {
    id: 1,
    name: "Gourmet Burger Deluxe",
    image: "/images/burger.jpg",
    views: 1250,
    label: "Trending",
    labelColor: "bg-pink-600"
  },
  {
    id: 2,
    name: "Artisan Pepperoni Pizza",
    image: "/images/pizza.jpg",
    views: 980,
    label: "Popular",
    labelColor: "bg-blue-600"
  },
  {
    id: 3,
    name: "Creamy Pesto Pasta",
    image: "/images/pasta.jpg",
    views: 700,
  },
  {
    id: 4,
    name: "Spicy Chicken Wings",
    image: "/images/wings.jpg",
    views: 620,
  },
  {
    id: 5,
    name: "Fresh Garden Salad",
    image: "/images/salad.jpg",
    views: 410,
  },
  {
    id: 6,
    name: "Molten Lava Cake",
    image: "/images/cake.jpg",
    views: 380,
  },
];

export default function ModelInsights() {
  return (
    <div
      className="relative group bg-[#0D1017] border border-[#1F2532]
      rounded-2xl p-6 shadow-[0_0_25px_-10px_rgba(0,0,0,0.6)]
      transition-all duration-500 hover:shadow-[0_0_37px_-10px_rgba(30,58,138,0.6)]"
    >
       <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

      <h2 className="text-base font-medium mb-1">3D Model Insights</h2>
      <p className="text-xs text-gray-400 mb-4">Top-performing AR dishes</p>

      {/* Scroll hidden */}
      <div className="space-y-3 max-h-[380px] overflow-y-scroll pr-1 hide-scrollbar">
        {topModels.map((model) => (
          <div
            key={model.id}
            className="flex items-center gap-3 bg-[#11141D] p-2 rounded-lg border border-gray-800"
          >
            <img
              src={model.image}
              alt={model.name}
              className="w-10 h-10 rounded-md object-cover"
            />

            <div className="flex-1">
              <p className="text-xs font-medium text-gray-100">{model.name}</p>
              <p className="text-[10px] text-gray-400">{model.views} AR Views</p>
            </div>

            {model.label && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-sm text-white ${model.labelColor}`}>
                {model.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
