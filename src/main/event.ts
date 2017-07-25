import { BrowserWindow, ipcMain, dialog } from "electron";
import FluidConfig from "./fluid.config";

export default function setupEvents(win: Electron.BrowserWindow, base: string, config: FluidConfig) {
    ipcMain.on("/ipc/databases:get", function(event, args) {
        event.sender.send("/ipc/databases:get:response", [
            "Hello",
            "IPC"
        ]);
    });

    ipcMain.on("database:open", function(event, args) {
        dialog.showOpenDialog(win, {
            title: "Open Database",
            defaultPath: base,
            properties: ["openFile"]
        }, (path : string[]) => {
            if (path && path.length > 0) {
                config.databases.push(path[0]);
                event.sender.send("database:open:response", config);
            }
        });
    });
}