// src/hooks/useMenu.js
import { useState, useEffect, useMemo, useCallback } from "react";
import menuApi from "../api/menuApi";

const RESTAURANT_ID = "restaurant123";

export default function useMenu() {
  // Core states
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses] = useState(["All Statuses", "Available", "Unavailable"]);
  const [statistics, setStatistics] = useState(null);

  // UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("name-asc");

  // Loading + error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------------------------------------------------------
    1️⃣ Fetch menu (with retry + loading UI)
  ------------------------------------------------------------ */
  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await menuApi.getMenu(RESTAURANT_ID);
      const data = res.data.data;
      const list = data.dishes ?? [];

      setDishes(list);

      setCategories([
        "All Categories",
        ...new Set(list.map((d) => d.category || "Uncategorized")),
      ]);

      setStatistics({
        total: list.length,
        available: list.filter((d) => d.available).length,
        byStatus: {
          ready: list.length,
          processing: 0,
        },
      });

      setLoading(false);
    } catch (e) {
      console.error("Menu fetch error:", e);
      setError("Failed to load menu");
      setLoading(false);

      // Auto retry after 2 seconds (production-safe)
      setTimeout(fetchMenu, 2000);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  /* ------------------------------------------------------------
    2️⃣ Debounce search for smoother UI
  ------------------------------------------------------------ */
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(delay);
  }, [searchQuery]);

  /* ------------------------------------------------------------
    3️⃣ Filtering + Sorting (super optimized using useMemo)
  ------------------------------------------------------------ */
  const filteredDishes = useMemo(() => {
    if (loading) return [];

    let list = [...dishes];

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((d) => d.name.toLowerCase().includes(q));
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      list = list.filter((d) => d.category === selectedCategory);
    }

    // Availability filter
    if (selectedStatus !== "All Statuses") {
      const shouldBe = selectedStatus === "Available";
      list = list.filter((d) => d.available === shouldBe);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // name-asc
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [dishes, debouncedSearch, selectedCategory, selectedStatus, sortBy, loading]);

  /* ------------------------------------------------------------
    4️⃣ Toggle availability (optimistic UI + rollback)
  ------------------------------------------------------------ */
  const toggleAvailability = async (dishId) => {
    const prevState = dishes;

    // 1. Optimistic update (super fast)
    setDishes((prev) =>
      prev.map((d) =>
        d._id === dishId ? { ...d, available: !d.available } : d
      )
    );

    try {
      const res = await menuApi.toggleAvailability(RESTAURANT_ID, dishId);
      const newAvailable = res.data.data.available;

      // Sync with server
      setDishes((prev) =>
        prev.map((d) =>
          d._id === dishId ? { ...d, available: newAvailable } : d
        )
      );

      // Update stats fast
      setStatistics((prev) => ({
        ...prev,
        available: newAvailable
          ? prev.available + 1
          : prev.available - 1,
      }));
    } catch (err) {
      console.error("toggleAvailability error:", err);

      // Rollback UI if server failed
      setDishes(prevState);
    }
  };

  /* ------------------------------------------------------------
    5️⃣ Delete Dish (fast + safe)
  ------------------------------------------------------------ */
  const deleteDish = async (dishId) => {
    const previous = dishes;

    // Optimistic removal
    setDishes((prev) => prev.filter((d) => d._id !== dishId));

    try {
      await menuApi.deleteDish(RESTAURANT_ID, dishId);
    } catch (err) {
      console.error("Delete error:", err);
      // Rollback
      setDishes(previous);
    }
  };

  /* ------------------------------------------------------------
    6️⃣ Auto-refetch when user returns to tab (production!)
  ------------------------------------------------------------ */
  useEffect(() => {
    const onFocus = () => fetchMenu();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchMenu]);

  /* ------------------------------------------------------------
    7️⃣ Clear filters
  ------------------------------------------------------------ */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedStatus("All Statuses");
    setSortBy("name-asc");
  };

  /* ------------------------------------------------------------
    Return Final Values
  ------------------------------------------------------------ */
  return {
    loading,
    error,
    dishes,
    filteredDishes,
    categories,
    statuses,
    statistics,
    searchQuery,
    selectedCategory,
    selectedStatus,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStatus,
    setSortBy,
    toggleAvailability,
    deleteDish,
    clearFilters,
  };
}
