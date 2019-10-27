const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Listen for the app to be ready
app.on("ready", function() {
  // create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load html file into the window
  mainWindow.loadFile(
    // url.format({
    //   pathname: path.join(__dirname, "mainWindow.html"),
    //   protocol: "file:",
    //   slashes: true
    // })
    "mainWindow.html"
  );

  mainWindow.on("closed", function() {
    app.quit();
  });
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  console.log("MAIN MENU INVOKED");
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add shopping list item",
    webPreferences: {
      nodeIntegration: true
    }
  });

  addWindow.loadFile("addWindow.html");

  // Garbage collection handle
  addWindow.on("closed", function() {
    addWindow = null;
  });
}

ipcMain.on("item:add", function(event, item) {
  mainWindow.webContents.send("item:add", item);
  console.log(item);
  addWindow.close();
});
// create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Item",
        click() {
          mainWindow.webContents.send("item:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];
// Add developer tools item if not in prod
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focussedWindow) {
          focussedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
