import type { Task } from "../types/task"

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000"

const headers = {
  "Content-Type": "application/json",
}

/* GET */
export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/api/tasks`)
  if (!res.ok) throw new Error("Failed to fetch tasks")
  return res.json()
}

/* POST */
export async function createTask(
  task: Omit<Task, "_id">
): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  })

  if (!res.ok) throw new Error("Failed to create task")
  return res.json()
}

/* PUT */
export async function updateTask(
  id: string,
  updates: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  })

  if (!res.ok) throw new Error("Failed to update task")
  return res.json()
}

/* DELETE */
export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Failed to delete task")
}
