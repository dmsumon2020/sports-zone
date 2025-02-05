import { useEffect, useState } from "react";

import Equipment from "../Equipment/Equipment";

const Equipments = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data from the API
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          "https://sports-zone-server-lime.vercel.app/equipments/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  // Extract unique categories
  const categories = Array.from(
    new Set(equipments.map((item) => item.categoryName))
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-10/12 mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-1/4">
          <h2 className="text-2xl font-bold mb-4">List of Categories</h2>
          <ul className="list-disc ml-4">
            {categories.map((category, index) => (
              <li key={index} className="mb-2 text-gray-700">
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <div className="all-items grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-3/4">
          {equipments.map((equipment) => (
            <Equipment key={equipment._id} equipment={equipment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipments;
