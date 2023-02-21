import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { useForm } from "react-hook-form";
const Login = () => {
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setData(data);
  };
  return (
    <div>
      <Navbar />
      <section class="text-gray-600 body-font relative">
        <form
          class="container px-5 py-24 mx-auto flex flex-col justify-center items-center w-[30%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
            Login To Your Account
          </h2>
          <div class="relative mb-4 w-full">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4 w-full">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4 w-full">
            <label for="password" class="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              name="password"
              class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {errors.exampleRequired && <span>This field is required</span>}
          <button
            class="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
