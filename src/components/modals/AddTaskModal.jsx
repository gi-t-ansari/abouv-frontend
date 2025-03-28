import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { API_URL, CATEGORY_OPTIONS, TASK_OPTIONS } from "../../config";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AddTaskModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required.")
      .max(30, "Title should not be more that 30 letters."),
    description: yup
      .string()
      .max(300, "Description should not be more that 300 letters."),
    category: yup.string().required("Category is required."),
    status: yup.string().required("Status is required."),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
    reset();
  };

  const addTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      try {
        setLoading(true);
        const response = await axios.post(API_URL, taskData, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add task");
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
      reset();
    },
    onError: (error) => {
      console.error("Error adding task:", error);
      setLoading(false);
    },
  });

  const handleAddTask = (data) => {
    addTaskMutation.mutate(data);
  };

  return (
    open && (
      <div className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed z-20">
        <div
          className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed bg-[rgba(49,49,49,0.8)]"
          onClick={onClose}
        ></div>
        <div className="absolute md:top-[50%] bottom-0 md:left-[50%] md:-translate-x-1/2 md:-translate-y-1/2 overflow-hidden leading-snug bg-white  md:rounded-[20px] rounded-t-[20px] rounded-b-lg md:w-[674px] w-full md:h-fit h-[95%] flex flex-col">
          <header className="p-4 border-b w-full h-fit border-[#0000001A] flex items-center justify-between sticky top-0 bg-white z-10">
            <h4 className="text-2xl font-semibold">Create Task</h4>
            <IoClose onClick={onClose} size={24} className="cursor-pointer" />
          </header>
          <form
            className="w-full pt-2 flex-1 overflow-y-auto"
            onSubmit={handleSubmit(handleAddTask)}
          >
            <div className="w-full px-4">
              <input
                {...register("title")}
                type="text"
                placeholder="Task title"
                className={`w-full text-sm p-2 outline-none border ${
                  errors?.title ? "border-red-500" : "border-[#00000021]"
                } placeholder:text-[#A2A3A7] rounded-lg`}
              />
              {errors?.title && (
                <p className="text-[10px] text-red-500">
                  {errors?.title?.message}
                </p>
              )}
            </div>
            <div className="w-full px-4 mt-3">
              <div className="w-full h-fit relative">
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Description"
                  className={`w-full resize-none text-sm p-2 outline-none border ${
                    errors?.description
                      ? "border-red-500"
                      : "border-[#00000021]"
                  } placeholder:text-[#A2A3A7] rounded-lg`}
                />
                <p
                  className={`${
                    (watch("description") || "").length <= 300
                      ? "text-[#A2A3A7]"
                      : "text-red-500"
                  } text-xs absolute right-3 bottom-3`}
                >
                  {`${(watch("description") || "").length}/300 characters`}
                </p>
              </div>
              {errors?.description && (
                <p className="text-[10px] text-red-500">
                  {errors?.description?.message}
                </p>
              )}
            </div>
            <div className="w-full px-4 mt-2 flex md:flex-row flex-col md:items-center md:justify-between md:gap-x-4 gap-y-2">
              <div className="md:flex-1">
                <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                  Task Category*
                </h6>
                <div className="flex items-center gap-x-3">
                  {CATEGORY_OPTIONS.map((ele, ind) => (
                    <label
                      key={`${ele}${ind + 9}`}
                      className={`px-6 py-2.5 rounded-full text-[10px] ${
                        watch("category") === ele
                          ? "bg-[#7B1984] border-[#7B1984] text-white"
                          : "border-[#00000021] text-[#090909]"
                      }  font-bold border transition duration-300 ease-linear`}
                    >
                      <input
                        {...register("category")}
                        name="category"
                        value={ele}
                        type="radio"
                        hidden
                      />
                      {ele}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:flex-1">
                <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                  Task Status*
                </h6>
                <select
                  {...register("status")}
                  className="md:w-full w-1/2 text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg"
                >
                  <option value="">Choose</option>
                  {TASK_OPTIONS.map((ele, ind) => (
                    <option key={`${ele}${ind + 9}`} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <footer className="bg-[#F1F1F1] flex justify-end items-center gap-x-2 p-4 h-fit">
              <button
                disabled={loading}
                onClick={handleCancel}
                className=" px-6 py-2.5 cursor-pointer text-sm uppercase font-bold rounded-full text-[#090909] bg-white border border-[#00000030]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading ||
                  !watch("title") ||
                  !watch("status") ||
                  !watch("category")
                }
                className={`${
                  loading ||
                  !watch("title") ||
                  !watch("status") ||
                  !watch("category")
                    ? "bg-[#B685BA] cursor-not-allowed"
                    : "bg-[#7B1984] cursor-pointer"
                } px-6 py-2.5 text-sm uppercase font-bold rounded-full text-white`}
              >
                {loading ? (
                  <div className="h-3 w-3 rounded-full animate-spin border-[#7B1984] border-t-2"></div>
                ) : (
                  "Create"
                )}
              </button>
            </footer>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTaskModal;
