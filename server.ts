import app from "./app";
import swaggerDocs from "./utils/swagger";

const PORT = process.env.PORT||8000;

app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`);
    swaggerDocs(app, PORT as number)
    console.log(`Docs available at http://localhost:${PORT}/docs`)
});