import { ipcRenderer } from "electron";

export default function ports(app: ElmProgram) {
    /**
     * find databases
     */
    app.ports.reqestDatabases.subscribe((_) => {
        ipcRenderer.send("/ipc/databases:get");
    });

    ipcRenderer.on("/ipc/databases:get:response", (event, args) => {
        app.ports.responseDatabases.send(args);
    });
}