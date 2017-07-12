import { app, BrowserWindow } from "electron";
declare var __dirname: string

let win : Electron.BrowserWindow;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    // TODO fix url
    win.loadURL(`file://${__dirname}/../renderer/index.html`);
    win.on("closed", () => win = null);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (!win)
        createWindow();
});