import "./index.scss";
import ports from "./Ports/ports";
import * as Elm from "./Main.elm";

const container = document.getElementById('container');
const app = Elm.Main.embed(container);

// setup ports
ports(app);
