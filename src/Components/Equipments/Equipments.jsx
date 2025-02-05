import { useContext, useEffect, useState } from "react";
import Equipment from "../Equipment/Equipment";
import { useLocation, useNavigate } from "react-router-dom";
import "./Equipments.css";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Fade } from "react-awesome-reveal";

const Equipments = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  // Check if the component is loading on the homepage or not
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  //auth for local storage
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchCategoriesAndEquipments = async () => {
      try {
        const response = await fetch(
          "https://sports-zone-server-lime.vercel.app/equipments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch equipments");
        }
        const data = await response.json();

        const uniqueCategories = [
          ...new Set(data.map((equipment) => equipment.categoryName)),
        ];
        setCategories(uniqueCategories);

        // Set the default category
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }

        // Fetch equipments based on the default category
        fetchEquipments(uniqueCategories[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategoriesAndEquipments();
  }, []);

  // Fetch equipment items based on the selected category
  const fetchEquipments = async (category) => {
    try {
      setLoading(true);

      const url = isHome
        ? `https://sports-zone-server-lime.vercel.app/equipments/category/${category}?limit=10`
        : `https://sports-zone-server-lime.vercel.app/equipments/category/${category}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch equipments");
      }
      const data = await response.json();
      setEquipments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection change
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchEquipments(category);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {isHome ? (
        <section>
          <h2 className="text-[20px] md:text-[36px] font-semibold text-center">
            All Equipments/ Items
          </h2>
        </section>
      ) : (
        <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
          <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
            All Equipments
          </h2>
        </section>
      )}

      <Fade triggerOnce={true} delay={300}>
        <section className="w-10/12 mx-auto">
          {/* Category list */}
          <div className="category-list mb-4 flex justify-center gap-5 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category-btn relative uppercase font-semibold text-sm ${
                  category === selectedCategory ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Equipments list */}
          <div className="all-items grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-3/4 mx-auto gap-4">
            {equipments.map((equipment) => (
              <Equipment
                key={equipment._id}
                equipment={equipment}
                user={user}
              />
            ))}
          </div>
        </section>
        {isHome && (
          <div className="w-8/12 mx-auto my-16 flex justify-center">
            <button
              onClick={() => {
                navigate("/equipments");
              }}
              class="btn bg-primaryColor rounded-none text-white text-[20px] hover:bg-black"
            >
              Browse All Items
            </button>
          </div>
        )}
      </Fade>
    </>
  );
};

export default Equipments;
