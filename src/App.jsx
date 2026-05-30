import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header/Header.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import TodoList from './components/TodoList/TodoList.jsx'
import Modal from './components/Modal/Modal.jsx'
import FilterDropdown from './components/FilterDropdown/FilterDropdown.jsx'
import { MoonIcon, PlusIcon, SunIcon } from './components/Icons/Icons.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import './styles/App.css'

const STORAGE_KEY = 'figma-todo-list.v2.tasks'
const THEME_KEY = 'figma-todo-list.v2.theme'

const initialTasks = [
  {
    id: 'starter-1',
    title: 'NOTE #1',
    description: '',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'starter-2',
    title: 'NOTE #2',
    description: '',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'starter-3',
    title: 'NOTE #3',
    description: '',
    completed: false,
    createdAt: new Date().toISOString(),
  },
]

function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, initialTasks)
  const [theme, setTheme] = useLocalStorage(THEME_KEY, 'light')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [modalMode, setModalMode] = useState('closed')
  const [activeTask, setActiveTask] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const filteredTasks = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()

    return tasks.filter((task) => {
      if (filter === 'complete' && !task.completed) {
        return false
      }

      if (filter === 'incomplete' && task.completed) {
        return false
      }

      if (!normalizedTerm) {
        return true
      }

      const haystack = `${task.title} ${task.description}`.toLowerCase()
      return haystack.includes(normalizedTerm)
    })
  }, [filter, searchTerm, tasks])

  const openAddModal = () => {
    setActiveTask(null)
    setModalMode('add')
  }

  const openEditModal = (task) => {
    setActiveTask(task)
    setModalMode('edit')
  }

  const closeModal = () => {
    setModalMode('closed')
    setActiveTask(null)
  }

  const saveTask = ({ title, description }) => {
    if (modalMode === 'edit' && activeTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === activeTask.id ? { ...task, title, description } : task,
        ),
      )
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      }

      setTasks((currentTasks) => [newTask, ...currentTasks])
    }

    closeModal()
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <main className="app-shell">
      <section className="todo-board" aria-labelledby="page-title">
        <Header />

        <div className="todo-toolbar">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterDropdown value={filter} onChange={setFilter} />
          <button
            className="theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <TodoList
          tasks={filteredTasks}
          hasSearch={Boolean(searchTerm.trim()) || filter !== 'all'}
          theme={theme}
          onEdit={openEditModal}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />

        <button className="fab-button" type="button" onClick={openAddModal} aria-label="Add Task">
          <PlusIcon />
        </button>
      </section>

      <Modal
        isOpen={modalMode !== 'closed'}
        mode={modalMode}
        task={activeTask}
        onClose={closeModal}
        onSave={saveTask}
      />
    </main>
  )
}

export default App
