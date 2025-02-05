import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateEquipment = () => {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const formRef = useRef();

  const displayName = user?.displayName;
  const email = user?.email;

  // Error state
  const [error, setError] = useState("");

  //equipment state
  const [equipment, setEquipment] = useState(null);

  // state for loading
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id]);

  const handleUpdateEquipment = async (event) => {
    event.preventDefault();

    // Collect all form values
    const updatedEquipment = {
      image: event.target.image.value,
      itemName: event.target.itemName.value,
      categoryName: event.target.categoryName.value,
      description: event.target.description.value,
      price: event.target.price.value,
      rating: event.target.rating.value,
      customization: event.target.customization.value,
      processingTime: event.target.processingTime.value,
      stockStatus: event.target.stockStatus.value,
    };

    const showAlert = (icon, title, message) => {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Close",
      });
    };

    // Validation
    if (
      !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(
        updatedEquipment.image
      )
    ) {
      setError("Please provide a valid image URL.");
      showAlert("error", "Error!", "Please provide a valid image URL.");
      return;
    }

    if (updatedEquipment.itemName.length < 5) {
      setError("Item Name must be at least 5 characters long.");
      showAlert(
        "error",
        "Error!",
        "Item Name must be at least 5 characters long."
      );
      return;
    }

    if (!updatedEquipment.categoryName) {
      setError("Please select a category.");
      showAlert("error", "Error!", "Please select a category.");
      return;
    }

    if (updatedEquipment.description.length < 20) {
      setError("Description must be at least 20 characters long.");
      showAlert(
        "error",
        "Error!",
        "Description must be at least 20 characters long."
      );
      return;
    }

    if (updatedEquipment.price < 10) {
      setError("Price must be at least 10.");
      showAlert("error", "Error!", "Price must be at least 10.");
      return;
    }

    if (
      updatedEquipment.rating < 1 ||
      updatedEquipment.rating > 5 ||
      isNaN(updatedEquipment.rating)
    ) {
      setError("Rating must be between 1 and 5.");
      showAlert("error", "Error!", "Rating must be between 1 and 5.");
      return;
    }

    if (updatedEquipment.customization.length < 20) {
      setError("Customization options must be at least 20 characters long.");
      showAlert(
        "error",
        "Error!",
        "Customization options must be at least 20 characters long."
      );
      return;
    }

    if (
      isNaN(updatedEquipment.processingTime) ||
      updatedEquipment.processingTime < 1
    ) {
      setError("Processing time must be a number and cannot be less than 1.");
      showAlert(
        "error",
        "Error!",
        "Processing time must be a number and cannot be less than 1."
      );
      return;
    }

    if (updatedEquipment.stockStatus <= 0) {
      setError("Stock status cannot be 0 or negative.");
      showAlert("error", "Error!", "Stock status cannot be 0 or negative.");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `https://sports-zone-server-lime.vercel.app/equipments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEquipment),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update equipment");
      }

      const result = await response.json();
      if (result) {
        showAlert(
          "success",
          "Success!",
          "The item has been updated successfully"
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">
            Update Equipment Page: {equipment?.itemName}
          </p>
        </h2>
      </section>

      <section className="pt-5 md:pt-[100px]">
        <div className="card bg-base-100 w-full max-w-4xl mx-auto shrink-0 shadow-2xl">
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
                className="input input-bordered rounded-none text-black"
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
                className="input input-bordered rounded-none text-black"
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
                className="input input-bordered rounded-none text-black"
                required
                defaultValue={equipment?.image || ""}
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
                className="input input-bordered rounded-none text-black"
                required
                defaultValue={equipment?.itemName || ""}
              />
            </div>

            {/* Category Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <select
                name="categoryName"
                className="select select-bordered rounded-none text-black"
                defaultValue={equipment?.categoryName || ""}
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
                className="textarea textarea-bordered rounded-none text-black"
                rows="4"
                required
                defaultValue={equipment?.description || ""}
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
                className="input input-bordered rounded-none text-black"
                required
                defaultValue={equipment?.price || ""}
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
                className="input input-bordered rounded-none text-black"
                min="0"
                max="5"
                step="0.1"
                required
                defaultValue={equipment?.rating || ""}
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
                className="textarea textarea-bordered rounded-none text-black"
                rows="3"
                required
                defaultValue={equipment?.customization || ""}
              ></textarea>
            </div>

            {/* Processing Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Processing Time (Delivery Time)
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g., 3-5 days"
                name="processingTime"
                className="input input-bordered rounded-none text-black"
                required
                defaultValue={equipment?.processingTime || ""}
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
                className="input input-bordered rounded-none text-black"
                required
                defaultValue={equipment?.stockStatus || ""}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mt-2">
                <strong>{error}</strong>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn bg-primaryColor rounded-none text-white text-[20px] hover:bg-black">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateEquipment;
