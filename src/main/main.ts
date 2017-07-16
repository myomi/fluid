import { app, BrowserWindow } from "electron";
import * as sqlite3 from "sqlite3";
import * as fs from "fs";
import * as path from "path";

declare var __dirname: string

let win : Electron.BrowserWindow;

function createWindow() {
    win = new BrowserWindow({ fullscreen: true });
    // TODO fix url
    win.loadURL(`file://${__dirname}/../renderer/index.html`);
    win.on("closed", () => win = null);

    const base = path.join(home(), ".fluid");
    if (!fs.existsSync(base)) {
        fs.mkdirSync(base);
    }
    var dbFile = path.join(base, "db.sqlite3");
    if (fs.existsSync(dbFile)) {
        var db = new sqlite3.Database(dbFile);
    } else {
        var db = new sqlite3.Database(dbFile);
        db.run('CREATE TABLE mytable (title STRING, id INTEGER, is_done BOOLEAN);');
    }
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

function home(): string {
    return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}