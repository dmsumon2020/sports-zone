import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://sports-zone-server-lime.vercel.app/equipments/")
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(data.map((item) => item.categoryName)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section className="w-10/12 mx-auto">
      <h1>Categories Section</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
