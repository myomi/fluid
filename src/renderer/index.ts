import "./index.scss";
import * as Elm from "./Main.elm";

let container = document.getElementById('container');
Elm.Main.embed(container);
