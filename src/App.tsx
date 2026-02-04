import { useEffect, useState } from "react"
import type { Task } from "./types/task"
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api/api"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreate = async (task: Omit<Task, "_id">) => {
    const newTask = await createTask(task)
    setTasks((prev) => [...prev, newTask])
  }

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    const updated = await updateTask(id, updates)
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? updated : t))
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return
    await deleteTask(id)
    setTasks((prev) => prev.filter((t) => t._id !== id))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <TaskForm onCreate={handleCreate} />
      <TaskList
        tasks={tasks}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
