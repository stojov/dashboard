import React, { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Cron from "react-js-cron"
import "antd/dist/antd.css"
import { useMutation } from "react-query"
import { postJobs } from "./api"
import { useNavigate, useParams } from "react-router-dom"
import Alert from "../../components/Alert"

export function JobForm() {
  const navigate = useNavigate()
  const params = useParams()
  const mutation = useMutation(postJobs)

  const { id } = params
  const { isLoading, isError, data, error } = useQuery("job", fetchJob(id), {
    retry: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    defaultValue = data,
  } = useForm()

  const onSubmit = (data) => {
    mutation.mutate(
      { ...data, schedule: value },
      {
        onSuccess: (data) => {
          navigate("/job")
        },
        onError: (error) => {
          setPostError(error)
        },
      }
    )
  }

  const inputRef = useRef(null)
  const defaultValue = "30 5 * * 1,6"
  const [value, setValue] = useState(defaultValue)
  const customSetValue = useCallback(
    (newValue) => {
      setValue(newValue)
      inputRef.current?.setValue(newValue)
    },
    [inputRef]
  )
  const [error, onError] = useState()
  const [postError, setPostError] = useState()

  return (
    <form
      className="w-full border mx-auto p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {postError && <Alert message={postError} />}
      <div className="mb-4">
        <h2 className="text-4xl font-medium leading-tight mt-0 text-black-600">
          Schedule a job
        </h2>
      </div>
      <div className="flex items-center mb-6">
        <div className="">
          <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Rss Url:
          </label>
        </div>
        <div>
          <input
            className={`appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${
              errors.rssUrl?.type === "required"
                ? "border-red-500"
                : "border-blue-400"
            }`}
            type="text"
            {...register("rssUrl", { required: true })}
          />
          {errors.rssUrl?.type === "required" && (
            <div className="text-red-500 text-left">This field is required</div>
          )}
        </div>
      </div>
      <div className="flex items-center mb-6 py-4">
        <div className="">
          <label className="block text-gray-800 font-bold md:text-right pr-4">
            Schedule:
          </label>
        </div>
        <div>
          <div className="flex">
            <Cron value={value} setValue={customSetValue} onError={onError} />
          </div>

          <p className="text-red-500">{error ? error.description : ""}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="">
          <button
            type="submit"
            className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Add Job
          </button>
        </div>
      </div>
    </form>
  )
}
