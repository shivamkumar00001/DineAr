import React, { useState, useEffect } from 'react';
import { Search, Plus, Menu, ChefHat, X } from 'lucide-react';




import Sidebar from '../../components/menu/Sidebar.jsx';

import dishService from '../../services/DishService';
import { SORT_OPTIONS } from '../../utils/constants.js';
import { STATUS_COLORS } from '../../utils/constants.js';

import DishCard from '../../components/menu/DishCard';

const DishList = () => {
   

  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('name-asc');
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load initial data
    const allDishes = dishService.getAllDishes();
    setDishes(allDishes);
    setFilteredDishes(allDishes);
    setCategories(dishService.getCategories());
    setStatuses(dishService.getStatuses());
    setStatistics(dishService.getStatistics());
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = dishService.filterDishes({
      searchQuery,
      category: selectedCategory,
      status: selectedStatus
    });

    filtered = dishService.sortDishes(filtered, sortBy);
    setFilteredDishes(filtered);
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, dishes]);

  const handleToggleAvailability = (dishId) => {
    dishService.toggleAvailability(dishId);
    const updatedDishes = [...dishService.getAllDishes()];
    setDishes(updatedDishes);
    setStatistics(dishService.getStatistics());
  };

  const handleEdit = (dish) => {
    console.log('Edit dish:', dish);
    alert(`Edit functionality for: ${dish.name}`);
    // Navigate to edit page or open modal
  };

  const handleDelete = (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      console.log('Delete dish:', dishId);
      alert('Delete functionality - In production, this would delete the dish');
      // Implement delete logic
    }
  };

  const handleRefresh = (dishId) => {
    console.log('Refresh dish:', dishId);
    alert('Refreshing dish data...');
    // Implement refresh logic
  };

  const handleAddNewDish = () => {
    alert('Add New Dish - Navigate to add dish form');
    // Navigate to add dish page
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStatus('All Statuses');
    setSortBy('name-asc');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-500">ARMenu Manager</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="https://ui-avatars.com/api/?name=Admin&background=06b6d4&color=fff" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="relative h-full">
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
            >
              <X className="w-6 h-6" />
            </button>
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* Page Header with Stats */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold">Dish List</h2>
              <button 
                onClick={handleAddNewDish}
                className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add New Dish</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {/* Statistics Cards */}
            {statistics && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Total Dishes</p>
                  <p className="text-3xl font-bold text-white">{statistics.total}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Available</p>
                  <p className="text-3xl font-bold text-green-500">{statistics.available}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Ready</p>
                  <p className="text-3xl font-bold text-blue-500">{statistics.byStatus.ready}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-yellow-500/50 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Processing</p>
                  <p className="text-3xl font-bold text-yellow-500">{statistics.byStatus.processing}</p>
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 min-w-full md:min-w-64">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 cursor-pointer transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 cursor-pointer transition-all"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 cursor-pointer transition-all"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Active Filters & Clear Button */}
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Showing <span className="text-white font-semibold">{filteredDishes.length}</span> of <span className="text-white font-semibold">{dishes.length}</span> dishes
              </p>
              {(searchQuery || selectedCategory !== 'All Categories' || selectedStatus !== 'All Statuses' || sortBy !== 'name-asc') && (
                <button
                  onClick={clearFilters}
                  className="text-cyan-500 hover:text-cyan-400 text-sm font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Dish Cards */}
          <div className="space-y-4">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onToggleAvailability={handleToggleAvailability}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRefresh={handleRefresh}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg mb-2">No dishes found</p>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination (Optional for future) */}
          {filteredDishes.length > 10 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-white">
                  1
                </button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all">
                  2
                </button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all">
                  3
                </button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all">
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DishList;