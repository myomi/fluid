declare module "*.css" {
  const classes: {[className: string]: string};
  export default classes;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.elm" {
  const Elm: Elm;
  export = Elm;
}

interface Elm {
    Main: ElmMain;
}

interface ElmMain {
    embed(HtmlElement): ElmProgram;
    fullscreen(HtmlElement): ElmProgram;
}

interface ElmProgram {
    ports: any;
}