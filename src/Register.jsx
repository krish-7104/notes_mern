import React from "react";
import Navbar from "./Components/Navbar";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userDetails } from "./redux/actions";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (credential) => {
    toast.loading("Creating Account...");
    try {
      const data = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const jsonData = await data.json();
      if (data.status === 200) {
        dispatch(userDetails(jsonData.authToken));
        localStorage.setItem("token", jsonData.authToken);
        toast.dismiss();
        toast.success("Account Created");
        navigate("/");
      } else {
        toast.dismiss();
        toast.error(jsonData.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <form
          className="container px-5 py-20 mx-auto flex flex-col justify-center items-center w-[30%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">
            Create An Account
          </h2>
          <div className="relative mb-4 w-full">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              placeholder="Beautiful Name"
              {...register("name", { required: true })}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              placeholder="abc@xyz.com"
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 w-full">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              placeholder="*********"
              {...register("password", { required: true })}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {errors.exampleRequired && <span>This field is required</span>}
          <button
            className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </section>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Register;
