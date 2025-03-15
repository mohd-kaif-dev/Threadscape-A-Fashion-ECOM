import { useEffect, useRef } from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ProductGrid from "../Components/Products/ProductGrid";
import SortOptions from "../Components/Products/SortOptions";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice.js";

const CollectionsPage = () => {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    const container = sidebarRef.current;
    // Close sidebar if clicked outside
    if (container && !container.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row mt-20">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center font-semibold"
      >
        <FaFilter className="w-4 h-4 mr-2" /> Filters
      </button>
      <div
        ref={sidebarRef}
        style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
        className={` ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 max-w-64 min-w-64 lg:max-w-48 lg:min-w-48 lg:ml-4 lg:my-2  bg-white p-4 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 rounded-xl`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4 flex flex-col">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        {/* Sort Options */}
        <SortOptions />

        {/* Product Grids */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionsPage;
