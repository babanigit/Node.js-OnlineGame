import express,{Express} from "express"
import path from "path"

const  app:Express =express();
const port = 3000;
const dirname = path.resolve();

app.use(express.static("public"))

console.log(dirname)

app.get("/",(req,res)=>{
  res.sendFile(dirname + "/public/index.html")
})

app.listen(port,()=>{
  console.log(`express serve is live on http://localhost:${port}`)
})
