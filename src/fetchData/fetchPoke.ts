
const loadPoke = async (id: number, cb: (value: string) => void) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  cb(data);
};

export default loadPoke;