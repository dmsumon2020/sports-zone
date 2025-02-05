import React, { useEffect, useState, useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import UsersAddedEquipment from "../UsersAddedEquipment/UsersAddedEquipment";
import { Fade } from "react-awesome-reveal";

const Equipments = () => {
  const { user, loading } = useContext(authContext);
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      const fetchEquipments = async () => {
        try {
          const response = await fetch(
            `https://sports-zone-server-lime.vercel.app/equipments/email/${user.email}`
          );

          if (!response.ok) {
            throw new Error("Error fetching equipments");
          }

          const data = await response.json();
          setEquipments(data);
        } catch (err) {
          setError("Error fetching equipments.");
        }
      };

      fetchEquipments();
    }
  }, [user]);

  const handleDelete = (id) => {
    setEquipments((prevEquipments) =>
      prevEquipments.filter((equipment) => equipment._id !== id)
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!equipments.length) {
    return (
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">
            No added equipments found for : {user?.displayName}
          </p>
        </h2>
      </section>
    );
  }

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">
            Added Equipments By : {equipments[0]?.name}
          </p>
        </h2>
      </section>

      <Fade triggerOnce={true} delay={300}>
        <section className="w-10/12 mx-auto">
          <div className="all-items grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-3/4 mx-auto gap-4 pt-5 md:pt-[100px]">
            {equipments.map((equipment) => (
              <UsersAddedEquipment
                key={equipment._id}
                equipment={equipment}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Equipments;
