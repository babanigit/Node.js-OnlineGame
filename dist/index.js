"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchPoke_1 = __importDefault(require("./fetchData/fetchPoke"));
console.log("hello world");
function fetchData(callback) {
    // Simulate fetching data asynchronously
    setTimeout(() => {
        const data = "Some fetched data";
        // Call the callback function and pass the fetched data to it
        callback(data);
    }, 1000); // Simulating a 1-second delay
}
function handleData(data) {
    console.log("Data received:", data);
}
// Call the fetchData function and pass the handleData function as a callback
fetchData(handleData);
(0, fetchPoke_1.default)(56, (poke => {
    console.log(poke);
}));
