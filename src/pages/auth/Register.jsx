import React, { useState } from "react";
import { AuthLayout } from "../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { APP_URL, API_URL } from "../../config";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required.")
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces.")
      .min(3, "Name must be at least 3 characters long.")
      .max(50, "Name cannot be longer than 50 characters."),
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

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      setLoading(true);
      const response = await axios.post(API_URL.REGISTER, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: () => {
      navigate(APP_URL.LOGIN);
      reset();
      setLoading(false);
    },
    onError: (error) => {
      console.error(
        "Registration Error:",
        error.response?.data?.message || error.message
      );
      setLoading(false);
    },
  });

  const handleRegister = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-4  rounded-xl bg-white xl:w-[30%] md:w-[40%] w-[90%] h-fit  shadow-2xl flex flex-col gap-y-4 shadow-[#7B1984]"
      >
        <h1 className="md:text-4xl text-2xl text-[#7B1984] font-bold uppercase text-center md:my-4 my-2">
          Register
        </h1>
        <div className="w-full ">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className={`w-full md:text-base text-sm p-2 outline-none border ${
              errors?.name ? "border-red-500" : "border-[#00000021]"
            } placeholder:text-[#A2A3A7] rounded-lg`}
          />
          {errors?.name && (
            <p className="md:text-xs text-[10px] text-red-500">
              {errors?.name?.message}
            </p>
          )}
        </div>

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
            <div className="md:h-4 md:w-4 h-3.5 w-3.5 rounded-full animate-spin border-white border-t-2"></div>
          ) : (
            "Register"
          )}
        </button>
        <p className="text-center md:text-sm text-xs">
          Already Registered?{" "}
          <Link
            aria-disabled={loading}
            to={APP_URL.LOGIN}
            className="font-bold text-[#7B1984]"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
