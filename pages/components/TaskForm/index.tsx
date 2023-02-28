import { Task } from "@/pages/types";
import React, { useRef } from "react";
import { TextField, Button } from "@mui/material";

const contentType = "application/json";

export const TaskForm: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);

  async function createTask(e: React.MouseEvent) {
    const taskData: Task = {
      title: titleRef.current!.value,
      details: detailsRef.current!.value,
      due: dateRef.current!.value,
      isCompleted: false,
    };
    fetch("https://todo.crudful.com/tasks", {
      method: "POST",
      headers: {
        cfAccessKey: process.env.NEXT_PUBLIC_CF_ACCESS_KEY!,
        "Content-Type": contentType,
      },
      body: JSON.stringify(taskData), // convert task data to JSON string
    });
  }
  return (
    <form
      className="fixed left-1/2 top-1/2 -translate-x-1/2
     -translate-y-1/2 z-40 p-4 flex flex-col gap-4 bg-white rounded-md"
    >
      <div className="w-80 gap-4 flex flex-row items-center justify-between">
        <label
          className="text-lg font-semibold text-opacity-80"
          htmlFor="due-date"
        >
          Title
        </label>
        <TextField
          inputRef={titleRef}
          name="title"
          id="title"
          variant="outlined"
        />
      </div>
      <div className="w-80 justify-between gap-4 flex flex-row">
        <label
          className="text-lg font-semibold text-opacity-80"
          htmlFor="details"
        >
          Details
        </label>
        <TextField
          multiline
          rows={4}
          inputRef={detailsRef}
          name="details"
          id="details"
          variant="outlined"
        />
      </div>
      <div className="w-80 justify-between gap-4 flex flex-row items-center">
        <label
          className="text-lg font-semibold text-opacity-80"
          htmlFor="due-date"
        >
          Due Date
        </label>
        <input
          ref={dateRef}
          name="due-data"
          id="due-data"
          className="border-black border-[1px] p-[12px] rounded-md border-opacity-40"
          type="date"
        />
      </div>
      <Button
        className="bg-blue-500"
        variant="contained"
        onClick={(e: React.MouseEvent) => createTask(e)}
      >
        Contained
      </Button>
    </form>
  );
};
