import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    // setStartX(e.clientX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX - scrollRef.current.offsetLeft;
    const walk = currentX - startX;
    // const walk = e.clientX - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth + 1;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }

    // console.log({
    //   leftScroll: container?.scrollLeft,
    //   scrollWidth: container?.scrollWidth,
    //   clientWidth: container?.clientWidth,
    // });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error in Fetching New Arrivals", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      {newArrivals.length > 0 ? (
        <>
          <div className="container mx-auto text-center mb-20 sm:mb-16 relative">
            <h2 className="text-2xl font-bold mb-4">Explore New Arrivals</h2>
            <p className=" text-gray-600 mb-8">
              Discover the latest styles straight off the runaway, freshly added
              to keep your wardrobe on the cutting edge of fashion
            </p>
            {/* Scroll Buttons */}
            <div className="absolute right-0 bottom-[-70px] md:bottom-[-50px] flex space-x-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-2 rounded-full border bg-white text-black disabled:bg-gray-200 disabled:text-gray-500 shadow-md shadow-black"
              >
                <FiChevronLeft className="text-2xl" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-2 rounded-full border bg-white text-black disabled:bg-gray-200 disabled:text-gray-500 shadow-md shadow-black"
              >
                <FiChevronRight className="text-2xl" />
              </button>
            </div>
          </div>
          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`container mx-auto overflow-x-scroll flex space-x-6 relative select-none snap-both md:snap-none rounded-lg ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
          >
            {newArrivals?.map((product) => (
              <div
                key={product._id}
                className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] rounded-lg relative snap-center md:snap-none container h-[400px] overflow-hidden shadow-2xl shadow-black"
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  draggable="false"
                  className="w-[110%] h-[110%] object-cover rounded-lg scale-110 hover:scale-100 transition-all duration-500 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 right-0 text-white bg-black/50 backdrop-blur-md p-2 rounded-b-lg">
                  <Link to={`/product/${product._id}`} className="block">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm mt-1">${product.price}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-xl text-center animate-pulse">
          Loading New Arrivals...
        </p>
      )}
    </section>
  );
};

export default NewArrivals;
