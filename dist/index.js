"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const dirname = path_1.default.resolve();
app.use(express_1.default.static("public"));
console.log(dirname);
app.get("/", (req, res) => {
    res.sendFile(dirname + "/public/index.html");
});
app.listen(port, () => {
    console.log(`express serve is live on http://localhost:${port}`);
});
