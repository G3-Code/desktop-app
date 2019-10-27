const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for the app to be ready
app.on("ready", function() {
  // create new window
  mainWindow = new BrowserWindow({});

  // Load html file into the window
  mainWindow.loadFile(
    // url.format({
    //   pathname: path.join(__dirname, "mainWindow.html"),
    //   protocol: "file:",
    //   slashes: true
    // })
    "mainWindow.html"
  );
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  console.log("MAIN MENU INVOKED");
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item"
      },
      {
        label: "Clear Item"
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
