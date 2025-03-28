import React, { useState } from "react";
import { AuthLayout } from "../../components";
import { useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { APP_URL } from "../../config";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Enter a valid email address."
      ),
    password: yup
      .string()
      .required("Password is required.")
      .matches(/.{8,}/, "Password must be at least 8 characters long.")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)."
      )
      .matches(/\d/, "Password must contain at least one number (0-9).")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)."
      ),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleLogin = (data) => {};

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-4  rounded-xl bg-white md:w-[30%] w-[90%] h-fit  shadow-2xl flex flex-col gap-y-4 shadow-[#7B1984]"
      >
        <h1 className="md:text-4xl text-2xl text-[#7B1984] font-bold uppercase text-center md:my-4 my-2">
          Login
        </h1>
        <div className="w-full ">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`w-full md:text-base text-sm p-2 outline-none border ${
              errors?.email ? "border-red-500" : "border-[#00000021]"
            } placeholder:text-[#A2A3A7] rounded-lg`}
          />
          {errors?.email && (
            <p className="md:text-xs text-[10px] text-red-500">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="w-full ">
          <div className="w-full relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full md:text-base text-sm p-2 outline-none border ${
                errors?.password ? "border-red-500" : "border-[#00000021]"
              } placeholder:text-[#A2A3A7] rounded-lg`}
            />

            {!showPassword ? (
              <FaRegEyeSlash
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#A2A3A7]"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaRegEye
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#A2A3A7]"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          {errors?.password && (
            <p className="md:text-xs text-[10px] text-red-500">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !watch("email") || !watch("password")}
          className={`${
            loading || !watch("email") || !watch("password")
              ? "bg-[#B685BA] cursor-not-allowed"
              : "bg-[#7B1984] cursor-pointer"
          } px-6 py-2.5 md:text-base text-sm uppercase font-bold rounded-lg text-white w-full flex justify-center`}
        >
          {loading ? (
            <div className="h-3.5 w-3.5 rounded-full animate-spin border-white border-t-2"></div>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-center md:text-sm text-xs">
          New user?{" "}
          <Link to={APP_URL.REGISTER} className="font-bold text-[#7B1984]">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
