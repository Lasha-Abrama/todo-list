# Simple Todo List

A modern React Todo List application built to closely match the **Simple ToDo List Design** Figma concept. It includes light and dark themes, task filtering, searching, editable notes, persistent storage, and a responsive modal-based workflow.

## 🎨 Design

🔗 **Figma Prototype:**  
[Click here to view the design](https://www.figma.com/design/QPl1sGvPVdhtN1F1Jzfbg8/Simple-ToDo-List-Design?node-id=0-1&t=HU9Pqg35NyNlEiEy-1)

## Preview

The interface follows the supplied Figma design references:

- Minimal centered layout
- Light and dark color schemes
- Kanit typography with Inter used for the search input
- Custom SVG icons for theme, search, edit, delete, add, and check states
- Floating add button
- Figma-style dropdown, modal, checkboxes, and empty state illustration

## Features

- Add new todo notes
- Edit existing notes
- Delete notes
- Mark notes as complete or incomplete
- Filter by `All`, `Complete`, or `Incomplete`
- Search notes in real time
- Toggle between light and dark mode
- Empty-state illustration for no results
- LocalStorage support so notes and theme remain after refresh
- Responsive layout for desktop, tablet, and mobile
- Tiny-screen modal fixes for very narrow viewports

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- LocalStorage

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

[http://127.0.0.1:5173/](http://127.0.0.1:5173/)

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── FilterDropdown/
│   ├── Header/
│   ├── Icons/
│   ├── Modal/
│   ├── SearchBar/
│   ├── TodoItem/
│   └── TodoList/
├── hooks/
│   └── useLocalStorage.js
├── styles/
│   ├── App.css
│   └── global.css
├── App.jsx
└── main.jsx
```

## Design Notes

- Global font: `Kanit`
- Search input font: `Inter`
- Main purple: `#6C63FF`
- Light background: `#F7F7F7`
- Dark background: `#252525`
- Most font weights are `500`
- Empty-state text uses weight `400`

## Core Components

`App.jsx`  
Controls task state, filtering, searching, modal state, theme switching, and LocalStorage persistence.

`FilterDropdown`  
Custom dropdown with dynamic widths for `All`, `Complete`, and `Incomplete`.

`Modal`  
Reusable add/edit note modal with responsive button layout.

`TodoItem`  
Displays each note row with checkbox, edit, and delete controls.

`TodoList`  
Renders notes or the empty state.

`useLocalStorage`  
Reusable hook for persisted state.

## Status

The project is fully functional and visually tuned against the provided Figma exports.
