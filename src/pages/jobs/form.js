import React from "react";
import { useForm } from "react-hook-form";

export default function JobForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("rssUrl"), { required: true }} />
      {errors.rssUrlRequired && <span>This field is required</span>}

      <input {...register("schedule", { required: true })} />
      {errors.scheduleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}