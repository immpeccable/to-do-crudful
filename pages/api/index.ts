import { Task } from "../types";

const CF_ACCESS_KEY: string = process.env.NEXT_PUBLIC_CF_ACCESS_KEY!;
const contentType = "application/json";

export async function deleteTask(id: string) {
  try {
    let response = await fetch(`https://todo.crudful.com/tasks/${id}`, {
      method: "DELETE",
      headers: {
        cfAccessKey: CF_ACCESS_KEY!,
      },
    });
    response = await response.json();
    console.log(response);
  } catch (e) {
    console.error(e);
  }
  window.location.reload();
}

export async function patchTask(newTask: Task) {
  let response;
  try {
    response = await fetch(`https://todo.crudful.com/tasks/${newTask.id}`, {
      method: "PATCH",
      headers: {
        cfAccessKey: process.env.NEXT_PUBLIC_CF_ACCESS_KEY!,
        "Content-Type": contentType,
      },
      body: JSON.stringify(newTask),
    });
    response = await response.json();
  } catch (e) {
    console.error(e);
  }
  console.log("patch response: ", response);
}

export async function fetchTasks(): Promise<Task[] | undefined> { 
  // Get tasks
  let response;
  try {
    response = await fetch("https://todo.crudful.com/tasks?ordering=due", {
      method: "GET",
      headers: {
        cfAccessKey: CF_ACCESS_KEY!,
      },
    }).then((response) => response.json());
    return response.results as Task[]
  } catch (e) {
    console.error(e);
  }
}

export async function createTask(task:Task) {
  let response = await fetch("https://todo.crudful.com/tasks", {
    method: "POST",
    headers: {
      cfAccessKey: process.env.NEXT_PUBLIC_CF_ACCESS_KEY!,
      "Content-Type": contentType,
    },
    body: JSON.stringify(task),
  });
  response = await response.json();
  console.log("create response: ", response);
  window.location.reload();
}