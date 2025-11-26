import React from 'react';
import { Edit2, Trash2, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { STATUS_COLORS } from '../../utils/constants';


const DishCard = ({ dish, onToggleAvailability, onEdit, onDelete, onRefresh }) => {
 
  const statusColor = STATUS_COLORS[dish.status] || STATUS_COLORS['Ready'];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex items-center gap-6">
        {/* Dish Image */}
        <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Dish Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{dish.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{dish.category}</p>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{dish.description}</p>
          <div className="flex gap-2 flex-wrap">
            {dish.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-500">₹{dish.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">{dish.preparationTime} mins</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onEdit(dish)}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              title="Edit"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onDelete(dish.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-cyan-500 transition-colors"
              title="Copy Link"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onRefresh(dish.id)}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
            {dish.status}
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Available</span>
          <label className="relative inline-block w-14 h-7 cursor-pointer">
            <input
              type="checkbox"
              checked={dish.available}
              onChange={() => onToggleAvailability(dish.id)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DishCard;