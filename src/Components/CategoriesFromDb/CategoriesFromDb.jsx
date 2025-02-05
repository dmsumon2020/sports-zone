import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

import { Link } from "react-router-dom";

const CategoriesFromDb = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://sports-zone-server-lime.vercel.app/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <section className="w-8/12 mx-auto my-8">
        <h2 className="text-[36px] font-semibold text-center mb-8">
          Product Categories
        </h2>
      </section>
      <Fade triggerOnce={true} delay={300}>
        <section className="w-8/12 mx-auto">
          <div className="categories-wrap grid grid-cols-1 md:grid-cols-12 gap-4">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className={`category-card relative group ${
                  index === 0
                    ? "col-span-4 md:row-span-2"
                    : index === 1
                    ? "col-span-5 md:row-span-1"
                    : index === 2
                    ? "col-span-3 md:row-span-1"
                    : index === 3
                    ? "col-span-3 md:row-span-1"
                    : "col-span-5 md:row-span-1"
                }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={category?.photo}
                  alt=""
                />
                <div className="absolute inset-0 group-hover:opacity-100 group-hover:visibility-visible group-hover:top-5 group-hover:right-5 group-hover:bottom-5 group-hover:left-5 transition-all duration-500 ease-linear bg-white bg-opacity-80 opacity-0 visibility-hidden z-10"></div>
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-10 scale-75 group-hover:scale-100 group-hover:visibility-visible z-20 transition-all duration-500 ease-linear">
                  <Link to={`/categories/${category._id}`}>
                    <h3 className="text-xl md:text-[40px] font-bold text-black text-center px-5 py-2">
                      {category?.name}
                    </h3>
                  </Link>
                  {/* View Category link */}
                  <Link
                    to={`/category/${category?.name}`}
                    className="text-base font-semibold opacity-0 group-hover:opacity-100 bg-primaryColor text-white px-1 py-1 md:px-6 md:py-2 md:mt-4 block  text-center transition-opacity duration-300"
                  >
                    View Category
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Fade>
    </>
  );
};

export default CategoriesFromDb;
