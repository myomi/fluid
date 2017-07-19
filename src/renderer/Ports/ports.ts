export default function ports(app: ElmProgram) {
    app.ports.reqestDatabases.subscribe((_) => {
        app.ports.responseDatabases.send(["John", "Tom", "Mike"]);
    });
}