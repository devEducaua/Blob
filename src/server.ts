import express from 'express'
import usersRouter from './users/user.routes.ts';
import postsRouter from './posts/posts.routes.ts';

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen( 3000, () => console.log("Server running"))
