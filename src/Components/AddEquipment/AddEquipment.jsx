import { useContext, useRef, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const AddEquipment = () => {
  const { user } = useContext(authContext);

  // ref to clear data
  const formRef = useRef();

  // Error state
  const [error, setError] = useState("");

  const displayName = user?.displayName;
  const email = user?.email;

  const handleAddEquipment = (event) => {
    event.preventDefault();

    // Collect all form values
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
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
    if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(formData.image)) {
      setError("Please provide a valid image URL.");
      showAlert("error", "Error!", "Please provide a valid image URL.");
      return;
    }

    if (formData.itemName.length < 5) {
      setError("Item Name must be at least 5 characters long.");
      showAlert(
        "error",
        "Error!",
        "Item Name must be at least 5 characters long."
      );
      return;
    }

    if (!formData.categoryName) {
      setError("Please select a category.");
      showAlert("error", "Error!", "Please select a category.");
      return;
    }

    if (formData.description.length < 20) {
      setError("Description must be at least 20 characters long.");
      showAlert(
        "error",
        "Error!",
        "Description must be at least 20 characters long."
      );
      return;
    }

    if (formData.price < 10) {
      setError("Price must be at least 10.");
      showAlert("error", "Error!", "Price must be at least 10.");
      return;
    }

    if (formData.rating < 1 || formData.rating > 5 || isNaN(formData.rating)) {
      setError("Rating must be between 1 and 5.");
      showAlert("error", "Error!", "Rating must be between 1 and 5.");
      return;
    }

    if (formData.customization.length < 20) {
      setError("Customization options must be at least 20 characters long.");
      showAlert(
        "error",
        "Error!",
        "Customization options must be at least 20 characters long."
      );
      return;
    }

    if (isNaN(formData.processingTime) || formData.processingTime < 1) {
      setError("Processing time must be a number and cannot be less than 1.");
      showAlert(
        "error",
        "Error!",
        "Processing time must be a number and cannot be less than 1."
      );
      return;
    }

    if (formData.stockStatus <= 0) {
      setError("Stock status cannot be 0 or negative.");
      showAlert("error", "Error!", "Stock status cannot be 0 or negative.");
      return;
    }

    setError(""); // Reset error if validation passes

    // If all validations pass, send the data to the server
    fetch("https://sports-zone-server-lime.vercel.app/equipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        showAlert(
          "success",
          "Success!",
          "The item has been successfully added to the database"
        );

        // Reset form fields except for name and email
        formRef.current.reset();
        event.target.name.value = displayName;
        event.target.email.value = email;
      });
  };

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          Add an Equipment
        </h2>
      </section>

      <Fade triggerOnce={true} delay={300}>
        <section className="pt-5 md:pt-[100px]">
          <div className="card bg-base-100 w-full max-w-4xl mx-auto shrink-0 shadow-2xl">
            <form
              onSubmit={handleAddEquipment}
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
                  defaultValue=""
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
      </Fade>
    </>
  );
};

export default AddEquipment;
