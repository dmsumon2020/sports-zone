import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../AuthProvider/AuthProvider";
import { addItemToCart } from "../Utility/Utility";
import { Fade } from "react-awesome-reveal";
import ReactStars from "react-rating-stars-component";
const EquipmentDetails = () => {
  const { id } = useParams(); // Get equipment id from the URL
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const { cartItems, setCartItems } = useContext(authContext);

  // Fetch equipment details
  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await fetch(
          `https://sports-zone-server-lime.vercel.app/equipments/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
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

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        `https://sports-zone-server-lime.vercel.app/reviews/${id}`
      );
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      id: id,
      name: equipment.itemName,
      price: equipment.price,
      image: equipment.image,
    };
    const wasAdded = addItemToCart(cartItem);
    if (wasAdded) {
      setCartItems([...cartItems, cartItem]);
    }
  };

  // Handle review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      equipmentId: id,
      userName: equipment?.name,
      reviewText: reviewText,
    };

    const response = await fetch(
      "https://sports-zone-server-lime.vercel.app/reviews",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      }
    );

    const result = await response.json();
    if (response.ok) {
      // Fetch reviews again after submitting
      const reviewsResponse = await fetch(
        `https://sports-zone-server-lime.vercel.app/reviews/${id}`
      );
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
      setReviewText(""); // Clear review input field
    } else {
      alert(result.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!equipment) return <p>No equipment found</p>;

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          Details: {equipment.itemName}
        </h2>
      </section>

      <Fade triggerOnce={true} delay={300}>
        <section className="w-11/12 md:w-10/12 mx-auto pt-5 md:pt-[100px]">
          <div className="details-wrap">
            <div className="flex flex-col md:flex-row gap-7 justify-around">
              <div className="item-image flex-1">
                <img src={equipment.image} alt={equipment.itemName} />
              </div>
              <div className="item-info flex-1 py-10">
                <p className="flex gap-1 items-center">
                  Rating: {equipment.rating}
                  <ReactStars
                    count={5}
                    value={equipment.rating}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </p>

                <h2 className="text-4xl my-8 font-bold text-gray-800">
                  {equipment.itemName}
                </h2>
                <p className="text-primaryColor text-4xl font-bold">
                  ${equipment.price} USD
                </p>
                <p className="item-description text-bodyFontColor text-[16px] font-normal tracking-wide my-5">
                  {equipment.description}
                </p>
                <p className="processing-time">
                  Processing Time:{" "}
                  <span className="text-bodyFontColor">
                    {equipment.processingTime} Days
                  </span>
                </p>

                <div className="mt-10 flex justify-between gap-5">
                  <button
                    onClick={handleAddToCart}
                    className="bg-primaryColor text-white px-2 md:px-10 py-2 font-bold flex-1 border border-primaryColor text-sm md:text-base"
                  >
                    Add to Cart
                  </button>
                  <button className="bg-black text-white px-2 md:px-10 py-2 font-bold flex-1 border border-white text-sm md:text-base">
                    Add to Wishlist
                  </button>
                </div>

                {/* review lis */}
                <div className="reviews mt-12">
                  <h2 className="text-3xl my-8 font-bold text-gray-800">
                    User Reviews
                  </h2>
                  <div>
                    {reviews.map((review) => (
                      <div key={review._id} className="review-item">
                        <h4 className="text-sm text-primaryColor font-bold">
                          {review.userName}
                        </h4>
                        <p className="text-bodyFontColor text-[14px] font-normal tracking-wide my-5">
                          {review.reviewText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fade>

      {/* Review form */}
      <section className="w-10/12 mx-auto">
        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl mx-auto">
          <form className="card-body" onSubmit={handleReviewSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered rounded-none text-black"
                value={equipment.name || ""}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Review</span>
              </label>
              <textarea
                placeholder="Write a review"
                className="textarea textarea-bordered rounded-none text-black"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="3"
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="bg-primaryColor text-white px-2 md:px-10 py-2 font-bold text-sm md:text-base flex-1 border transition-all duration-500 border-primaryColor hover:bg-black hover:border-black"
                type="submit"
              >
                Submit Reviewsss
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EquipmentDetails;
