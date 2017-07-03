import { app, BrowserWindow } from "electron";

let win;

function createWindow() {
    console.log(`${__dirname}/index.html`);
    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(`file://${__dirname}/index.html`);
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