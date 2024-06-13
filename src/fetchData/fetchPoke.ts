const loadPoke = async (id: number, cb: (value: string) => void) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  cb(data);
};

console.log("hello world");

function fetchData(callback: (value: string) => void) {
  // Simulate fetching data asynchronously
  setTimeout(() => {
    const data = "Some fetched data";
    // Call the callback function and pass the fetched data to it
    callback(data);
  }, 1000); // Simulating a 1-second delay
}

function handleData(data: string) {
  console.log("Data received:", data);
}
// Call the fetchData function and pass the handleData function as a callback
fetchData(handleData);

loadPoke(56, (poke) => {
  console.log(poke);
});
