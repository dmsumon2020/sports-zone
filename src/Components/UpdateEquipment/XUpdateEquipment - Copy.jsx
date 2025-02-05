import React, { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";

const UpdateEquipment = () => {
  const { user } = useContext(authContext);
  const { id } = useParams(); // Get equipment id from the URL
  const [equipment, setEquipment] = useState(null);
  const [formData, setFormData] = useState({});
  const formRef = useRef();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const displayName = user?.displayName;
  const email = user?.email;

  useEffect(() => {
    // Fetch the equipment details using the ID
    const fetchEquipmentDetails = async () => {
      try {
        const response = await fetch(
          `https://sports-zone-server-lime.vercel.app/equipments/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setEquipment(data);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateEquipment = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `https://sports-zone-server-lime.vercel.app/equipments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update equipment");
      }

      const result = await response.json();
      setSuccessMessage("Equipment updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <section>
        <h2>Update Equipment</h2>
      </section>

      <section>
        <div className="card bg-base-100 w-full max-w-lg mx-auto shrink-0 shadow-2xl">
          <form
            onSubmit={handleUpdateEquipment}
            className="card-body"
            ref={formRef}
          >
            {/* User Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                value={displayName || ""}
                name="name"
                className="input input-bordered"
                readOnly
              />
            </div>

            {/* User Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <input
                type="email"
                value={email || ""}
                name="email"
                className="input input-bordered"
                readOnly
              />
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                placeholder="Image URL"
                name="image"
                className="input input-bordered"
                required
                value={formData.image || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Item Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input
                type="text"
                placeholder="Item Name"
                name="itemName"
                className="input input-bordered"
                required
                value={formData.itemName || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Category Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <select
                name="categoryName"
                className="select select-bordered"
                value={formData.categoryName || ""}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Basketball">Basketball</option>
                <option value="Clothing">Clothing</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter description"
                name="description"
                className="textarea textarea-bordered"
                rows="4"
                required
                value={formData.description || ""}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                name="price"
                className="input input-bordered"
                required
                value={formData.price || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <input
                type="number"
                placeholder="Rating (0-5)"
                name="rating"
                className="input input-bordered"
                min="0"
                max="5"
                step="0.1"
                required
                value={formData.rating || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Customization */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Customization</span>
              </label>
              <textarea
                placeholder="Enter customization options"
                name="customization"
                className="textarea textarea-bordered"
                rows="3"
                value={formData.customization || ""}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Processing Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Processing Time</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 3-5 days"
                name="processingTime"
                className="input input-bordered"
                required
                value={formData.processingTime || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Stock Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock Status</span>
              </label>
              <input
                type="number"
                placeholder="Available product quantity"
                name="stockStatus"
                className="input input-bordered"
                required
                value={formData.stockStatus || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Update Equipment
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateEquipment;
