"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loadPoke = (id, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = yield res.json();
    cb(data);
});
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
loadPoke(56, (poke) => {
    console.log(poke);
});
