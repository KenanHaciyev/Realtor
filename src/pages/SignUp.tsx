import React, { BaseSyntheticEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useReactive } from "ahooks";
import * as yup from "yup";
import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInInputs, IState } from "../shared/models";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components";
import { auth, db } from "../firebase";

export const SignUp = () => {
  const state: IState = useReactive({
    showPassword: false,
  });

  const userSchema = yup.object().shape({
    name: string().required(),
    email: string().email().required("Email address is required"),
    password: string().required().min(6),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignInInputs>({
    resolver: yupResolver(userSchema) as any,
  });

  const navigate = useNavigate();

  const onSubmit = async (
    data: ISignInInputs,
    e: BaseSyntheticEvent | undefined,
  ) => {
    e?.preventDefault();

    try {
      const { email, password, name } = getValues();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password!,
      );

      updateProfile(auth.currentUser!, {
        displayName: name,
      });

      const user = userCredential.user;
      const formDataCopy = { ...getValues() };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");

      toast.success("Sign up was successful");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <h1 className={"text-3xl text-center mt-6 font-bold"}>Sign Up</h1>;
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media.istockphoto.com/id/1351204753/photo/open-the-door-and-door-handle-with-a-key-and-a-keychain-shaped-house-property-investment-and.jpg?s=2048x2048&w=is&k=20&c=OKZR5tRJ2Um_ys_bxX7tBCLkEaR7-nQVYZT1rIZoDlI="
            alt="key"
            className={"w-full rounded-2xl"}
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mb-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="name"
              id="name"
              placeholder={"Full name"}
              {...register("name")}
            />
            <small style={{ color: "crimson" }}>{errors.name?.message}</small>

            <input
              className="mb-3 mt-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              placeholder={"Email address"}
              {...register("email")}
            />
            <small style={{ color: "crimson" }}>{errors.email?.message}</small>

            <div className={"relative mb-6"}>
              <input
                className="mb-3 mt-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={state.showPassword ? "text" : "password"}
                id="password"
                placeholder={"Your password"}
                {...register("password")}
              />
              <small style={{ color: "crimson" }}>
                {errors.password?.message}
              </small>
              <div
                className="absolute right-3 top-6 text-xl cursor-pointer"
                onClick={() => (state.showPassword = !state.showPassword)}
              >
                {state.showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-3">
              <p>
                Have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  to="/sign-in"
                >
                  Sign In
                </Link>
              </p>

              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </p>
            </div>

            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign up
            </button>

            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};
