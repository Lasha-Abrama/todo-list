import { useEffect, useState } from 'react'

function readValue(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallbackValue
  } catch {
    return fallbackValue
  }
}


function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(() => readValue(key, fallbackValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
