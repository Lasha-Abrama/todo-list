import TodoItem from '../TodoItem/TodoItem.jsx'
import './TodoList.css'

function TodoList({ tasks, hasSearch, theme, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <section className="empty-state" aria-live="polite">
        <div className="empty-state__image" aria-hidden="true" data-theme-image={theme} />
        <h2>{hasSearch ? 'Empty...' : 'Empty...'}</h2>
      </section>
    )
  }

  return (
    <ul className="todo-list" aria-label="Todo tasks">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

export default TodoList
