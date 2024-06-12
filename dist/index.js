"use strict";
console.log("hello world");
function fetchData(callback) {
    // Simulate fetching data asynchronously
    setTimeout(() => {
        const data = "Some fetched data";
        // Call the callback function and pass the fetched data to it
        callback(data);
    }, 1000); // Simulating a 1-second delay
}
// Define a callback function to handle the fetched data
function handleData(data) {
    console.log("Data received:", data);
}
// Call the fetchData function and pass the handleData function as a callback
fetchData(handleData);
