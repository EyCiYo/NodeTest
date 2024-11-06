import express, { Request, Response } from "express"
const server = express();

server.get("/",(req:Request,res:Response) => {
    console.log(req.url);
    res.status(200).send("Hello World");
});

server.get("/profile",(req:Request,res:Response) => {
    
    const profile = {
        age: 23,
        name: "Alexander"
    }
    console.log(profile.name);
    res.status(200).send(profile)
})

server.listen(3000,()=>{
    console.log("Server Listening to 3000");
});