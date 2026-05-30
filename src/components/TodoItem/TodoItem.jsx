import { CheckIcon, DeleteIcon, EditIcon } from '../Icons/Icons.jsx'
import './TodoItem.css'

function TodoItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <li className={`todo-row ${task.completed ? 'todo-row--complete' : ''}`}>
      <label className="todo-row__check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span aria-hidden="true">
          {task.completed && <CheckIcon />}
        </span>
      </label>
      <h2>{task.title}</h2>
      <div className="todo-card__actions" aria-label={`${task.title} actions`}>
        <button
          className="icon-button"
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          title="Edit task"
        >
          <EditIcon />
        </button>
        <button
          className="icon-button icon-button--danger"
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
