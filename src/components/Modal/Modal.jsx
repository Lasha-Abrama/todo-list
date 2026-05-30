import { useEffect, useState } from 'react'
import './Modal.css'

const emptyForm = {
  title: '',
  description: '',
}

function Modal({ isOpen, mode, task, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: task?.title || '',
        description: task?.description || '',
      })
    }
  }, [isOpen, task])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const title = form.title.trim()
    const description = form.description.trim()

    if (!title) {
      return
    }

    onSave({ title, description })
  }

  return (
    <div className={`modal ${isOpen ? 'modal--open' : ''}`} aria-hidden={!isOpen}>
      <button
        className="modal__backdrop"
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close modal"
        onClick={onClose}
      />

      <section className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__header">
            <h2 id="modal-title">{mode === 'edit' ? 'EDIT NOTE' : 'NEW NOTE'}</h2>
          </div>

          <label className="form-field" htmlFor="todo-title">
            <input
              id="todo-title"
              type="text"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="Input your note..."
              required
            />
          </label>

          <div className="modal__actions">
            <button className="button button--ghost" type="button" onClick={onClose}>
              CANCEL
            </button>
            <button className="button button--primary" type="submit">
              APPLY
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Modal
