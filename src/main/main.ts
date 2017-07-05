import { app, BrowserWindow } from "electron";

let win;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    // TODO fix url
    win.loadURL(`file://${__dirname}/../../index.html`);
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