import React from "react";
import { useForm } from "react-hook-form";

export function JobForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Rss Url
          </label>
        </div>
        <div className="md:w-2/3">
          <input className={`appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${errors.rssUrl?.type === 'required' ? 'border-red-500' : 'border-purple-500'}`} type="text" {...register("rssUrl", { required: true })} />
          {errors.rssUrl?.type === 'required' && <div className="text-red-500 text-left">This field is required</div>}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Schedule
          </label>
        </div>
        <div className="md:w-2/3">
          <input className={`appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${errors.schedule?.type === 'required' ? 'border-red-500' : 'border-purple-500'}`} type="text" {...register("schedule", { required: true })} />
          {errors.schedule?.type === 'required' && <div className="text-red-500 text-left">This field is required</div>}
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button type="submit" className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}