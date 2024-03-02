import React from "react";
import { useReactive } from "ahooks";
import { ISignInInputs, IState } from "../shared/models";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OAuth } from "../components";

export const SignIn = () => {
  const state: IState = useReactive({
    showPassword: false,
  });
  const { register } = useForm<ISignInInputs>();

  return (
    <section>
      <h1 className={"text-3xl text-center mt-6 font-bold"}>Sign In</h1>;
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media.istockphoto.com/id/1351204753/photo/open-the-door-and-door-handle-with-a-key-and-a-keychain-shaped-house-property-investment-and.jpg?s=2048x2048&w=is&k=20&c=OKZR5tRJ2Um_ys_bxX7tBCLkEaR7-nQVYZT1rIZoDlI="
            alt="key"
            className={"w-full rounded-2xl"}
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              placeholder={"Email address"}
              {...register("email")}
            />

            <div className={"relative mb-6"}>
              <input
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={state.showPassword ? "text" : "password"}
                id="password"
                placeholder={"Your password"}
                {...register("password")}
              />
              <div
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => (state.showPassword = !state.showPassword)}
              >
                {state.showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-3">
              <p>
                Don't have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  to="/sign-up"
                >
                  Register
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
              Sign in
            </button>

            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
          </form>
          <OAuth />
        </div>
      </div>
    </section>
  );
};
