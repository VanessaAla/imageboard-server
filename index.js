const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const jsonParser = express.json();

const PORT = process.env.PORT || 4000;
const app = express();

//Middleware:
app.use(jsonParser);

//Routers:
app.use("/users", userRouter);
app.use("/images", imageRouter);

//start the server:
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
