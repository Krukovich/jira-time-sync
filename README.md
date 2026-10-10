my-electron-app/
├── dist/                     # Compiled/bundled assets for production
├── out/ or release/          # Packaged executables (.exe, .dmg, .app)
├── src/                      # Source files
│   ├── main/                 # Main Process logic
│   │   ├── index.js          # App entry point
│   │   └── ipcHandlers.js    # Native API logic (file system, DB, etc.)
│   │
│   ├── preload/              # Preload Scripts
│   │   └── index.js          # Securely exposes window.electronAPI
│   │
│   └── renderer/             # Renderer Process (Frontend)
│       ├── index.html        # Main HTML file
│       ├── src/              # Frontend framework files (React, Vue, etc.)
│       │   ├── components/   # UI components
│       │   ├── assets/       # Images, styles, fonts
│       │   └── main.js       # Frontend entry point
│       └── vite.config.js    # Frontend builder config (if using Vite)
│
├── package.json              # Project dependencies and config
└── README.md