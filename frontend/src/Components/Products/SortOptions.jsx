import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSort = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className="flex items-center justify-end mb-4">
      <select
        name="Sort By"
        id="sort"
        onChange={handleSort}
        value={searchParams.get("sortBy") || ""}
        className="p-2 border border-gray-300 rounded-md focus:outline-none text-sm md:text-lg"
      >
        <option value="">Default</option>
        <option value="Populartiy">Populartiy</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;
