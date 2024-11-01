import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.auth);

  const [alreadyLogged, setLogged] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLogged(false);
      if (user) {
        navigate("/"); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const formSubmit = async (form) => {
    const { email, password } = form;
    dispatch(loginStart());

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, email: userEmail, displayName } = userCredential.user;
      const serializedUser = { uid, email: userEmail, displayName };
      dispatch(loginSuccess(serializedUser));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure("Invalid email or password"));
      console.error(error.message);
    }
  };

   if (alreadyLogged) {
     return <div>Loading...</div>;
   }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <p className="text-sm">Sign in to access your account</p>
      </div>
      <div className="form-group">
        {error && <div className="alert text-error">{error}</div>}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Please enter a valid email."
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                  message: "Email is invalid",
                },
              })}
              className="input max-w-full"
            />
            {errors.email && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="form-control">
              <input
                placeholder="Enter your password"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="input max-w-full"
              />
            </div>
            {errors.password && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="form-field pt-5">
            <div className="form-control justify-between">
              {loading && <span className="loading loading-spinner"></span>}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="form-field">
            <div className="form-control justify-center">
              Need an account?{" "}
              <Link
                className="link link-underline-hover link-primary text-sm"
                to={`/register`}
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
