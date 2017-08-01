import * as fs from "fs";

export default class FluidConfig {
    private path: string;
    private databases: string[] = [];

    constructor(path: string) {
        this.path = path;
        let config:FluidConfig = null;
        if (fs.existsSync(path)) {
            // load
            const data = fs.readFileSync(path, "utf8");
            const parsed = JSON.parse(data);

            for (var key in parsed) {
                if (parsed.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                    this[key] = parsed[key];
                }
            }
            console.log("config -> " + JSON.stringify(this));
        } else {
            // init and save
            this.persist();
        }
        return this;
    }

    public addDatabase(path: string): void {
        if (this.databases.indexOf(path) >= 0) {
            return;
        }
        this.databases.push(path);
        this.persist();
    }

    private persist(): void {
        var json = JSON.stringify(this);
        fs.writeFile(this.path, json, "utf8", (err) => {
        });
    }
}