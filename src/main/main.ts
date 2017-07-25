import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as sqlite3 from "sqlite3";
import * as fs from "fs";
import * as path from "path";
import setupEvents from "./event";
import FluidConfig from "./fluid.config";

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
    var configFile = path.join(base, "config.json");
    var config = new FluidConfig(configFile);

    var dbFile = path.join(base, "fluid.sqlite3");
    if (fs.existsSync(dbFile)) {
        var db = new sqlite3.Database(dbFile);
    } else {
        var db = new sqlite3.Database(dbFile);
        db.run('CREATE TABLE mytable (title STRING, id INTEGER, is_done BOOLEAN);');
    }

    setupEvents(win, base, config);
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