import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const emailFromLogin = location.state?.email || "";
  const emailRef = useRef();

  const handleResetPassword = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        //toast.success("Password reset email sent! Check your inbox.");
        window.open("https://mail.google.com", "_blank");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error sending password reset email:", errorCode);
        // toast.error(
        //   "Failed to send password reset email. Please try again.",
        //   errorMessage
        // );
        // ..
      });
  };

  return (
    <>
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">Recover Password</p>
        </h2>
      </section>

      <section className="pt-5 md:pt-[100px]">
        <div className="card bg-base-100 w-full max-w-lg mx-auto shrink-0 border rounded-none  shadow-lg">
          <form onSubmit={handleResetPassword} className="card-body">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
                aria-describedby="email-error"
                autoComplete="username"
                required
                defaultValue={emailFromLogin}
                ref={emailRef}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RecoverPassword;
