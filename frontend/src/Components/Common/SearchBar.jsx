import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchBarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    const container = searchBarRef.current;
    // Close sidebar if clicked outside
    if (container && !container.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(setFilters({ search: searchTerm }));
      dispatch(fetchProductsByFilters({ search: searchTerm }));
      navigate(`/collections/all?search=${searchTerm}`);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={searchBarRef}
      className={`flex items-center justify-center w-full transition-transform duration-300 ${
        isOpen
          ? "absolute top-0 left-0 bg-white h-12 z-50 translate-y-0 rounded-xl"
          : "w-auto h-0 -translate-y-full"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-between w-full  "
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-black px-4 py-1 focus:outline-none w-full placeholder:text-gray-700"
          />
          {/* Search Icon */}
          <button
            type="submit"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMagnifyingGlass className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
