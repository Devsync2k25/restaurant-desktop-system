# 🍽️ Restaurant Desktop System

A comprehensive restaurant management system built with React, TypeScript, and Electron.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (Download from https://nodejs.org/)
- **npm** (comes with Node.js)

### Standard Installation & Run

1. **Clone or download** this project
2. **Open terminal/command prompt** in the project folder
3. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
4. **Run the application:**

   **Web Version (Recommended):**
   ```bash
   npm run dev
   ```
   Then open: http://localhost:5173

   **Desktop Version:**
   ```bash
   npm run electron
   ```

   **Both (Web + Desktop):**
   ```bash
   npm run dev
   # In another terminal:
   npm run electron
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server (web version)
- `npm run build` - Build for production
- `npm run electron` - Start desktop app
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎉 What You Get

- **Web Interface**: Modern React app with Tailwind CSS
- **Desktop App**: Electron-based desktop application
- **Multiple User Roles**: Bartender, Chef, Manager, Director, etc.
- **Real-time Features**: Live updates and notifications
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Troubleshooting

### "npm install failed"
- Check internet connection
- Try: `npm cache clean --force`
- Delete `node_modules` folder and try again

### "Port 5173 is already in use"
- Close other applications using port 5173
- Or restart your computer

### "Module not found"
- Make sure you're in the `frontend` directory
- Run `npm install` again

## 📁 Project Structure

```
restaurant-desktop-system/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utility functions
│   ├── package.json    # Dependencies
│   └── main.js         # Electron entry point
├── backend/            # Backend services
├── database/           # Database schema
└── docs/              # Documentation
```

## 🎯 Success Indicators

✅ You see "Local: http://localhost:5173" in terminal  
✅ Browser opens to the restaurant management interface  
✅ No red error messages in console  
✅ You can navigate between different user roles

## 💡 Pro Tips

- **First time**: Run `npm install` to install dependencies
- **Development**: Use `npm run dev` for hot reloading
- **Production**: Use `npm run build` then `npm run preview`
- **Desktop**: Use `npm run electron` for native app experience

## 📞 Need Help?

1. Check the terminal output for error messages
2. Make sure you're in the `frontend` directory
3. Verify Node.js is installed: `node --version`
4. Try running as Administrator if on Windows