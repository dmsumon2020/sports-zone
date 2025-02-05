import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Equipment from "../Equipment/Equipment";
import { Helmet } from "react-helmet-async";

const ItemsByCategory = () => {
  const { catName } = useParams();

  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemsByCategory = async (catName) => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://sports-zone-server-lime.vercel.app/equipments/category/${catName}`
        );
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
    fetchItemsByCategory(catName);
  }, []);

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
      <Helmet>
        <title>{catName} | Sports Zone</title>
      </Helmet>

      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">Category: {catName}</p>
        </h2>
      </section>

      {/* Equipments list */}
      <section>
        {equipments.length === 0 ? (
          <div className="w-8/12 mx-auto mt-10 text-center">
            No Item was found in this category
          </div>
        ) : (
          <div className="all-items grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-3/4 mx-auto gap-4">
            {equipments.map((equipment) => (
              <Equipment key={equipment._id} equipment={equipment} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ItemsByCategory;
<h2>Hello</h2>;
