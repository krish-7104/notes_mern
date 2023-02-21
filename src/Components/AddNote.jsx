import React from "react";
import { useForm } from "react-hook-form";
const AddNote = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch("example"));
  const onSubmit = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center flex-col"
    >
      <input
        placeholder="Note Title"
        {...register("title", { required: true })}
      />
      <input
        placeholder="Description"
        {...register("description", { required: true })}
      />
      <input
        defaultValue="General"
        placeholder="Category"
        {...register("category")}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default AddNote;
