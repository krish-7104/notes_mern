import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewNote, updateNote, editDataHandler } from "../redux/actions";

const AddNewNote = (props) => {
  const { editData } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (noteData) => {
    if (localStorage.getItem("token")) {
      if (editData.edit) {
        try {
          const data = await fetch(
            `http://localhost:5000/api/notes/updatenote/${editData.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
              body: JSON.stringify(noteData),
            }
          );
          const jsonData = await data.json();
          if (data.status === 200) {
            dispatch(
              updateNote({
                title: noteData.title,
                description: noteData.description,
                tag: noteData.tag,
                id: editData.id,
              })
            );
            dispatch(editDataHandler({}));
            toast.dismiss();
            toast.success("Note Updated Successfully");
            props.setOpen(false);
          } else {
            toast.dismiss();
            toast.error(jsonData.error);
          }
        } catch (error) {
          toast.dismiss();
          toast.error(error.message);
        }
      } else {
        try {
          const data = await fetch("http://localhost:5000/api/notes/addnote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(noteData),
          });
          const jsonData = await data.json();
          if (data.status === 200) {
            dispatch(addNewNote(jsonData));
            toast.dismiss();
            toast.success("Note Added Successfully");
            props.setOpen(false);
          } else {
            toast.dismiss();
            toast.error(jsonData.error);
          }
        } catch (error) {
          toast.dismiss();
          toast.error(error.message);
        }
      }
    } else {
      navigate("/register");
    }
  };
  return (
    <section className="text-gray-600 body-font relative">
      <form
        className="container px-5 py-10 mx-auto flex flex-col justify-center items-center w-[30%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-gray-900 text-2xl mb-4 font-medium title-font">
          {editData.edit ? "Update A Note" : "Add A New Note"}
        </h2>
        <div className="relative mb-4 w-full">
          <label htmlFor="title" className="leading-7 text-sm text-gray-600">
            Note Title
          </label>
          <input
            {...register("title", { required: true })}
            defaultValue={editData.edit ? editData.title : ""}
            type="text"
            id="title"
            name="title"
            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4 w-full">
          <label
            htmlFor="description"
            className="leading-7 text-sm text-gray-600"
          >
            Description
          </label>
          <input
            {...register("description", { required: true })}
            defaultValue={editData.edit ? editData.description : ""}
            type="text"
            id="description"
            name="description"
            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4 w-full">
          <label htmlFor="tag" className="leading-7 text-sm text-gray-600">
            Tag
          </label>
          <input
            {...register("tag", { required: true })}
            defaultValue={editData.edit ? editData.tag : "General"}
            type="text"
            id="tag"
            name="tag"
            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
        <button
          className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
          type="submit"
        >
          {editData.edit ? "Update Note" : "Add A Note"}
        </button>
      </form>
      <Toaster position="bottom-center" />
    </section>
  );
};

export default AddNewNote;
