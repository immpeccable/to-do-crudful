import { Task } from "@/utils/types";
import React, { useRef } from "react";
import { TextField, Button } from "@mui/material";

export const TaskForm: React.FC<{
  editedTask: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
  saveText: string;
}> = ({ editedTask, onSave, onCancel, saveText }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);

  function getCurrentTaskData(): Task {
    const taskData: Task = {
      title: titleRef.current!.value,
      // details: detailsRef.current!.value,
      // due: dateRef.current!.value,
      isCompleted: false,
    };
    if (detailsRef.current!.value) {
      taskData["details"] = detailsRef.current!.value;
    }
    if (dateRef.current!.value) {
      taskData["due"] = dateRef.current!.value;
    }
    return taskData;
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
          defaultValue={editedTask.title || ""}
          required
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
          defaultValue={editedTask.details || ""}
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
          name="due-date"
          id="due-date"
          className="border-black border-[1px] p-[12px] rounded-md border-opacity-40"
          type="date"
          defaultValue={editedTask.due || ""}
        />
      </div>
      <Button
        className="bg-blue-500"
        variant="contained"
        onClick={() => onSave(getCurrentTaskData())}
      >
        {saveText}
      </Button>
      <Button
        className="bg-red-500"
        variant="contained"
        onClick={onCancel}
        color="error"
      >
        Cancel
      </Button>
    </form>
  );
};
