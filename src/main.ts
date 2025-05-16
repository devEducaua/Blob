import express from 'express'
import router from './routes/userRoutes.ts';

const app = express();

app.use(express.json());

app.use("/user", router);

app.listen( 3000, () => console.log("Server running"))
