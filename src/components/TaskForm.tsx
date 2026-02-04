import { useState } from "react"
import type { TaskPriority, TaskStatus } from "../types/task"

interface Props {
  onCreate: (task: {
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
  }) => Promise<void>
}

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TaskStatus>("pending")
  const [priority, setPriority] =
    useState<TaskPriority>("medium")
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onCreate({ title, description, status, priority })
    setTitle("")
    setDescription("")
    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="mb-6 space-y-2">
      <input
        required
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  )
}
