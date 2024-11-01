import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [alreadyLogged, setAlreadyLoggedIn] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAlreadyLoggedIn(false);
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const formSubmit = async (form) => {
    const { email, password, confirmPassword, name } = form;
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
        registeredAt: new Date().toISOString(),
      })

      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setAuthError("Registration failed. Try again.");
    }
  };

  if (alreadyLogged) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Register</h1>
        <p className="text-sm">Create your account</p>
      </div>
      <div className="form-group">
        {authError && <div className="alert text-error">{authError}</div>}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Please enter your name."
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="input max-w-full"
            />
            {errors.name && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
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
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
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
            <input
              placeholder="Enter your password"
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input max-w-full"
            />
            {errors.password && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              placeholder="Confirm your password"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="input max-w-full"
            />
            {errors.confirmPassword && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className="form-field pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Register
            </button>
          </div>
          <div className="form-field">
            <div className="form-control justify-center">
              Already have an account?{" "}
              <Link
                className="link link-underline-hover link-primary text-sm"
                to={`/login`}
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
