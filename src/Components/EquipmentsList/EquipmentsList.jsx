import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const EquipmentsList = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          "https://sports-zone-server-lime.vercel.app/equipments/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch equipment list");
        }
        const data = await response.json();
        setEquipments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  // Sort functionality
  const handleSortByPrice = () => {
    const sortedEquipments = [...equipments].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setEquipments(sortedEquipments);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          Equipment List
        </h2>
      </section>

      <Fade triggerOnce={true} delay={300}>
        <section className="w-8/12 mx-auto my-8">
          <h2 className="text-2xl font-bold mb-4">List</h2>

          {/* Sort Button */}
          <div className="flex justify-end mb-4">
            <button
              className="sorting-btn bg-black text-white px-4 py-2 text-sm"
              onClick={handleSortByPrice}
            >
              Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>

          {/* Equipments Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="hidden md:table-cell">#</th>
                  <th>Photo</th>
                  <th className="hidden lg:table-cell">Item Name</th>
                  <th className="hidden lg:table-cell">Category</th>
                  <th className="hidden md:table-cell">Price</th>
                  <th>Details</th>
                  <th className="hidden lg:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((equipment, index) => (
                  <tr
                    key={equipment._id}
                    className="even:text-black" // Apply black text color to even rows
                  >
                    <th className="hidden md:table-cell">{index + 1}</th>
                    <td>
                      <img
                        src={equipment.image}
                        alt={equipment.itemName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="hidden lg:table-cell">
                      {equipment.itemName}
                    </td>
                    <td className="hidden lg:table-cell">
                      {equipment.categoryName}
                    </td>
                    <td className="hidden md:table-cell">${equipment.price}</td>
                    <td>
                      <button
                        className="bg-primaryColor text-white px-3 py-1 text-sm border border-primaryColor"
                        onClick={() => navigate(`/equipments/${equipment._id}`)}
                      >
                        Details
                      </button>
                    </td>
                    <td className="hidden lg:table-cell">
                      <button
                        className="bg-black text-white px-3 py-1 text-sm border border-white"
                        onClick={() =>
                          navigate(`/update-equipment/${equipment._id}`)
                        }
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Fade>
    </>
  );
};

export default EquipmentsList;
