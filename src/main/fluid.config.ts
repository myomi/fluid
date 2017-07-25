import * as fs from "fs";

export default class FluidConfig {
    private databases: string[] = [];

    constructor(path: string) {
        var config:FluidConfig = null;
        if (fs.existsSync(path)) {
            // load
            fs.readFile(path, "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } else {
                    config = JSON.parse(data);
                }
            });
        } else {
            // init and save
            config = this;
            var json = JSON.stringify(config);
            fs.writeFile(path, json, "utf8", (err) => {

            });
        }
        return config;
    }

    public addDatabase(path: string): void {
        if (this.databases.indexOf(path) >= 0) {
            return;
        }
        this.databases.push(path);
    }
}