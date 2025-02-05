import React, { useContext, useState, useRef } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { Fade } from "react-awesome-reveal";
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const { createUser, updateUsernameAndPhotoUrl, googleLogin } =
    useContext(authContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const from = location?.state || "/";
  const formRef = useRef();

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    });
  };

  const handleUserRegistration = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photo = event.target.photo.value;
    const password = event.target.password.value;

    setError("");

    if (name.length < 5) {
      setError("Name must be at least 5 characters long");
      showAlert(
        "error",
        "Error!",
        "Your name must be minimum 5 characters long"
      );

      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );

      showAlert(
        "error",
        "Error!",
        "Password must include at least one uppercase letter, one lowercase letter, and be 6 characters long."
      );

      return;
    }

    const isValidPhotoUrl = photo && /\.(jpg|jpeg|png|gif)$/i.test(photo);
    if (!isValidPhotoUrl) {
      setError("Please provide a valid image URL for your photo.");

      showAlert("error", "Error!", "Please provide a valid image URL.");

      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUsernameAndPhotoUrl(name, photo)
          .then(() => {
            // insert data in DB
            const userData = { name, email, photo };

            fetch("https://sports-zone-server-lime.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            })
              .then((response) => response.json())
              .then((data) => {});
          })
          .catch((error) => {
            console.error("Error updating profile:", error);

            showAlert(
              "error",
              "Error!",
              "There was an issue updating your profile."
            );
          });

        showAlert(
          "success",
          "Success!",
          "You have successfully registered an account"
        );

        formRef.current.reset();
        navigate("/");
      })
      .catch((error) => {
        // Handling specific error for email already in use
        if (error.code === "auth/email-already-in-use") {
          showAlert(
            "error",
            "Error!",
            "This email is already registered. Please use a different email."
          );
        } else {
          console.error("Error registering user:", error.code, error.message);

          showAlert(
            "error",
            "Error!",
            "An error occurred during registration. Please try again."
          );
        }
      });
  };

  // handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        if (user) {
          Swal.fire({
            title: "Success",
            text: "You have successfully logged in",
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            // Navigate only after the alert is closed
            navigate(from);
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/user-cancelled") {
          setError("You cancelled the login process.");
        } else {
          console.error("Google login error:", errorMessage);
        }
      });
  };

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">Register an Account</p>
        </h2>
      </section>

      <Fade triggerOnce={true} delay={300}>
        <section className="pt-5 md:pt-[100px]">
          <div className="card w-full max-w-4xl mx-auto shadow-2xl bg-white">
            <form
              onSubmit={handleUserRegistration}
              className="card-body"
              ref={formRef}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered rounded-none"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered rounded-none"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered rounded-none"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-primaryColor rounded-none text-white text-[20px] hover:bg-black">
                  Register
                </button>
              </div>

              <label className="label">
                <Link
                  to="/signin"
                  state={location.state} // Pass the location state
                  className="label-text-alt link link-hover"
                >
                  Already have an account?
                </Link>
              </label>
            </form>

            <div className="flex flex-col items-center justify-center px-10">
              <p className="text-[#EB5942] py-2">or</p>
              <div
                onClick={handleGoogleLogin}
                className="hover:cursor-pointer flex justify-center items-center gap-2 border border-[#242C36] px-4 py-2 w-full mb-10 transition duration-300 hover:bg-[#242C36] hover:text-white"
              >
                <FaGoogle />

                <button className="font-semibold">Continue with Google</button>
              </div>
            </div>

            {error && <p className="text-red-500 p-10 pt-0">{error}</p>}
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Register;
