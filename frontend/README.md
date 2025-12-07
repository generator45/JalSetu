# JalSetu Frontend

A React + TypeScript frontend application built with Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn package manager

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

This will start the development server. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`).

## Available Scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the development server                           |
| `npm run build`   | Build for production (TypeScript compile + Vite build) |
| `npm run preview` | Preview the production build locally                   |
| `npm run lint`    | Run ESLint to check for code issues                    |

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Project Structure

```text
src/
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable UI components
├── pages/         # Page components
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.
