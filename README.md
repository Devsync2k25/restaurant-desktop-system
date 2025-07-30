# Restaurant Desktop System

A comprehensive restaurant management system built with React, TypeScript, and Electron.

## Quick Start

### Option 1: One-Click Start (Windows)
Double-click `start-app.bat` to start both the development server and Electron app automatically.

### Option 2: Manual Start
1. **Install dependencies:**
   ```bash
   npm run install-deps
   ```

2. **Start the app:**
   ```bash
   npm start
   ```

### Option 3: Separate Commands
1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **In a new terminal, start Electron:**
   ```bash
   npm run electron
   ```

## Available Scripts

- `npm start` - Start both dev server and Electron app
- `npm run dev` - Start development server only
- `npm run electron` - Start Electron app only
- `npm run install-deps` - Install frontend dependencies
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

- Inventory Management
- Recipe Management
- User Management
- Analytics & Reports
- Role-based Access Control
- Real-time Notifications

## System Requirements

- Node.js 16+
- npm 8+
- Windows 10/11 (for .bat file)

## Troubleshooting

If you see a white screen in Electron:
1. Make sure the development server is running (`npm run dev`)
2. Check that `http://localhost:5173` is accessible in your browser
3. Restart Electron (`npm run electron`)

## Project Structure

```
restaurant-desktop-system/
├── frontend/          # React + Electron app
├── backend/           # Backend API
├── database/          # Database files
├── docs/             # Documentation
├── start-app.bat     # Windows startup script
└── package.json      # Root package.json with scripts
```