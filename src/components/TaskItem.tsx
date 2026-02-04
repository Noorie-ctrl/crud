import type { Task, TaskPriority, TaskStatus } from "../types/task"

interface Props {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  return (
    <li>
      <strong>{task.title}</strong>

      <select
        value={task.status}
        onChange={(e) =>
          onUpdate(task._id, { status: e.target.value as TaskStatus })
        }
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={task.priority}
        onChange={(e) =>
          onUpdate(task._id, { priority: e.target.value as TaskPriority })
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={() => onDelete(task._id)}>Delete</button>
    </li>
  )
}
