export type TaskStatus = "pending" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
}
