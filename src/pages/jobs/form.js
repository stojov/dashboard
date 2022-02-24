import React, { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Cron from "react-js-cron"
import "antd/dist/antd.css"
import { useMutation, useQuery } from "react-query"
import { fetchJob, postJobs, putJobs } from "./api"
import { useNavigate, useParams } from "react-router-dom"
import Alert from "../../components/Alert"

export function JobForm() {
  const navigate = useNavigate()
  const params = useParams()
  const create = useMutation(postJobs)
  const update = useMutation(putJobs)

  const { id } = params
  const { data, isLoading, isRefetching } = useQuery("job", fetchJob(id), {
    retry: false,
  })
  const defaultCronValue = "30 5 * * 1,6"

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    setValue("name", data?.name)
    setValue("rssUrl", data?.rssUrl)
    if (data?.schedule) {
      const schedule = data.schedule.slice(0, -1)
      setCronValue(schedule)
    } else {
      setCronValue(defaultCronValue)
    }
    //eslint-disable-next-line
  }, [data])

  const onSubmit = (data) => {
    setSubmitting(true)
    if (id) {
      update.mutate(
        { id, payload: { ...data, schedule: cronValue } },
        {
          onSuccess: (data) => {
            navigate("/job")
          },
          onError: (error) => {
            setSubmitting(false)
            setPostError(error.message)
          },
        }
      )
    } else {
      create.mutate(
        { ...data, schedule: cronValue },
        {
          onSuccess: (data) => {
            navigate("/job")
          },
          onError: (error) => {
            setSubmitting(false)
            setPostError(error.message)
          },
        }
      )
    }
  }

  const inputRef = useRef(null)
  const [cronValue, setCronValue] = useState(defaultCronValue)
  const customSetValue = useCallback(
    (newValue) => {
      setCronValue(newValue)
      inputRef.current?.setCronValue(newValue)
    },
    [inputRef]
  )
  const [cronError, onCronError] = useState()
  const [postError, setPostError] = useState()
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="w-full border mx-auto p-4">
      {!isLoading && !isRefetching && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {postError && <Alert message={postError} />}
          <div className="mb-4">
            <h2 className="text-4xl font-medium leading-tight mt-0 text-black-600">
              Schedule a job
            </h2>
          </div>
          <div className="flex items-center mb-6">
            <div className="">
              <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Name:
              </label>
            </div>
            <div>
              <input
                disabled={submitting}
                className={`appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${
                  errors.rssUrl?.type === "required"
                    ? "border-red-500"
                    : "border-blue-400"
                }`}
                type="text"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <div className="text-red-500 text-left">
                  This field is required
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="">
              <label className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Rss Url:
              </label>
            </div>
            <div>
              <input
                disabled={submitting}
                className={`appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${
                  errors.rssUrl?.type === "required"
                    ? "border-red-500"
                    : "border-blue-400"
                }`}
                type="text"
                {...register("rssUrl", {
                  required: true,
                  pattern: {
                    value:
                      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*).[a-z]{2,3}/g,
                    message: "Invalid url",
                  },
                })}
              />
              {errors.rssUrl?.type === "required" && (
                <div className="text-red-500 text-left">
                  This field is required
                </div>
              )}
              {errors.rssUrl && (
                <div className="text-red-500 text-left">
                  {errors.rssUrl.message}
                </div>
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
                <Cron
                  disabled={submitting}
                  value={cronValue}
                  setValue={customSetValue}
                  onError={onCronError}
                />
              </div>

              <p className="text-red-500">
                {cronError ? cronError.description : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="">
              <button
                disabled={submitting}
                type="submit"
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                {` ${id ? "Update" : "Add"} Job`}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
