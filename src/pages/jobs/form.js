import { InfoCircleOutlined } from "@ant-design/icons/lib/icons";
import React, { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Cron from 'react-js-cron'
import "antd/dist/antd.css";

export function JobForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const inputRef = useRef(null)
  const defaultValue = '30 5 * * 1,6'
  const [value, setValue] = useState(defaultValue)
  const customSetValue = useCallback(
    (newValue) => {
      setValue(newValue)
      inputRef.current?.setValue(newValue)
    },
    [inputRef]
  )
  const [error, onError] = useState()

  return (
    <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Rss Url:
          </label>
        </div>
        <div>
          <input className={`appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${errors.rssUrl?.type === 'required' ? 'border-red-500' : 'border-purple-500'}`} type="text" {...register("rssUrl", { required: true })} />
          {errors.rssUrl?.type === 'required' && <div className="text-red-500 text-left">This field is required</div>}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6 py-4">
        <div className="md:w-1/3">
          <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Schedule:
          </label>
        </div>
        <div>
          <Cron value={value} setValue={customSetValue} onError={onError} />

          <div>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            <span style={{ fontSize: 12 }}>
              Double click on a dropdown option to automatically select / unselect a
              periodicity
            </span>
          </div>

          <p style={{ marginTop: 20 }}>
            Error: {error ? error.description : 'undefined'}
          </p>
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