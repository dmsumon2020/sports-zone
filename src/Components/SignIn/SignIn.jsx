import { useContext, useRef } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const SignIn = () => {
  const { userLogin, googleLogin } = useContext(authContext);

  const location = useLocation();
  const from = location?.state || "/";
  const navigate = useNavigate();

  const handleUserLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user) {
          Swal.fire({
            title: "Success",
            text: "You have successfully logged in",
            icon: "success",
          });
          navigate(from);
        }
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/invalid-credential") {
          Swal.fire({
            title: "Error!!",
            text: "Your provided username and password do not match",
            icon: "error",
          });
          event.target.reset();
        }
      });
  };

  // handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        if (user) {
          Swal.fire({
            title: "Success",
            text: "You have successfully logged in",
            icon: "success",
          });
          navigate(from);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        if (errorCode === "auth/user-cancelled") {
          setError("You cancelled the login process.");
          //toast.error("You cancelled the login process.");
        }
        // ...
      });
  };

  // handle password recovery
  const emailRef = useRef(null);

  const handleRecoverPassword = (event) => {
    event.preventDefault(); // Prevent default link behavior
    const email = emailRef.current.value;

    navigate("/recover-password", { state: { email } });
  };

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">Signin to your Account</p>
        </h2>
      </section>

      <Fade triggerOnce={true} delay={300}>
        <section className="pt-5 md:pt-[100px]">
          <div className="card bg-base-100 w-full max-w-4xl mx-auto shrink-0 shadow-2xl">
            <form onSubmit={handleUserLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered rounded-none"
                  required
                  autoComplete="email"
                  ref={emailRef}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered rounded-none text-black"
                  name="password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-primaryColor rounded-none text-white text-[20px] hover:bg-black">
                  Login
                </button>
              </div>

              <div className="flex justify-between pt-3">
                <label className="label">
                  <a
                    onClick={handleRecoverPassword}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
                <label className="label">
                  <Link
                    to="/register"
                    state={location.state} // Pass the location state
                    className="label-text-alt link link-hover"
                  >
                    Don't have an account?
                  </Link>
                </label>
              </div>
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
          </div>
        </section>
      </Fade>
    </>
  );
};

export default SignIn;
