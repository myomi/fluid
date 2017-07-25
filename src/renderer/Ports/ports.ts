import { ipcRenderer } from "electron";

export default function ports(app: ElmProgram) {
    /**
     * get configulation
     */
    app.ports.getConfig.subscribe((_) => {
        ipcRenderer.send("config:get");
    });

    /**
     * response of get config
     */
    ipcRenderer.on("config:get:response", (event, args) => {
        app.ports.getConfigResponse.send(args);
    });

    /**
     * find databases
     */
    app.ports.reqestDatabases.subscribe((_) => {
        ipcRenderer.send("/ipc/databases:get");
    });

    ipcRenderer.on("/ipc/databases:get:response", (event, args) => {
        app.ports.responseDatabases.send(args);
    });

    app.ports.openDatabase.subscribe((_) => {
        ipcRenderer.send("database:open");
    });
    
    ipcRenderer.on("database:open:response", (event, args) => {
        app.ports.openDatabaseResponse.send(args);
    });
}