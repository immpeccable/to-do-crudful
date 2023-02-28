import { Task } from "../../utils/types";

const CF_ACCESS_KEY: string = "661ae1d23bad306eb39ebbc593464bc900fe2c2d";
const contentType = "application/json";

export async function deleteTask(id: string) {
  try {
    let response = await fetch(`https://todo.crudful.com/tasks/${id}`, {
      method: "DELETE",
      headers: {
        cfAccessKey: CF_ACCESS_KEY,
      },
    });
    response = await response.json();
    console.log(response);
  } catch (e) {
    console.error(e);
  }
  window.location.reload();
}

export async function patchTask(newTask: Task, id:string) {
  let response;
  console.log(newTask)
  try {
    response = await fetch(`https://todo.crudful.com/tasks/${id}`, {
      method: "PATCH",
      headers: {
        cfAccessKey: CF_ACCESS_KEY,
        "Content-Type": contentType,
      },
      body: JSON.stringify(newTask),
    });
    response = await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function fetchTasks(): Promise<Task[] | undefined> { 
  // Get tasks
  let response;
  try {
    response = await fetch("https://todo.crudful.com/tasks?ordering=due", {
      method: "GET",
      headers: {
        cfAccessKey: CF_ACCESS_KEY,
      },
    }).then((response) => response.json());
    return response.results as Task[]
  } catch (e) {
    console.error(e);
  }
}

export async function postTask(task:Task) {
  let response:any;
  try {
   response = await fetch("https://todo.crudful.com/tasks", {
      method: "POST",
      headers: {
        cfAccessKey: CF_ACCESS_KEY,
        "Content-Type": contentType,
      },
      body: JSON.stringify(task),
    });
  } catch (e) {
    console.error(e);
  }
  response = await response.json();
}