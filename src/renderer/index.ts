import "./index.scss";
import * as Elm from "./Main.elm";

const container = document.getElementById('container');
const app = Elm.Main.embed(container);

app.ports.reqestDatabases.subscribe((_) => {
    app.ports.responseDatabases.send(["John", "Tom", "Mike"]);
});