import React, { useState } from "react";
import { patchTask, postTask, fetchTasks } from "@/pages/api";
import { Task } from "@/utils/types";

export function useTaskController() {
  const [tasks, setTasks] = React.useState<Array<Task>>([]);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [editedTask, setEditedTask] = React.useState<Task>({
    title: "",
  });
  const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);

  const saveText = React.useMemo(
    () => (isBeingEdited ? "Edit Task" : "Create Task"),
    [isBeingEdited]
  );

  React.useEffect(() => {
    async function fetchData() {
      // Get tasks
      let fetchedTasks: Task[] | undefined = await fetchTasks();
      if (fetchedTasks) {
        setTasks(fetchedTasks);
      }
    }
    fetchData();
  }, []);

  function editTask(task: Task) {
    setIsPopupOpen(true);
    setEditedTask(task);
    setIsBeingEdited(true);
  }

  function createTask() {
    setIsPopupOpen(true);
  }

  function onCancel() {
    setIsPopupOpen(false);
    setIsBeingEdited(false);
    setEditedTask({ title: "" });
  }

  function onSave(currentTaskData: Task) {
    isBeingEdited
      ? patchTask(currentTaskData, editedTask.id!)
      : postTask(currentTaskData);
    window.location.reload();
  }
  async function reverseCompleted(task: Task) {
    const newTask: Task = { ...task, isCompleted: !task.isCompleted };
    await patchTask(newTask, newTask.id!);
  }

  return {
    tasks,
    isPopupOpen,
    editedTask,
    editTask,
    createTask,
    onCancel,
    onSave,
    reverseCompleted,
    isBeingEdited,
    saveText,
  };
}
