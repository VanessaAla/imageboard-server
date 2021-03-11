const express = require("express");

const PORT = process.env.PORT || 4000;
const app = express();

//start the server:
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
