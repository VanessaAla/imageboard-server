const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

const PORT = process.env.PORT || 4000;
const app = express();

//Middleware:
const jsonParser = express.json();
app.use(jsonParser);

//Routers:
app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/", authRouter);

//start the server:
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
