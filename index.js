// require('dotenv').config()
// const express = require("express");
// const app = express();
// const port = 3000;
// const programmingLanguagesRouter = require("./routes/programmingLanguages");
// app.use(express.json());
// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );
// app.get("/", (req, res) => {
//     res.json({ message: "ok" });
// });
// app.use("/programming-languages", programmingLanguagesRouter);
// /* Error handler middleware */
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({ message: err.message });
//     return;
// });
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "kevlangat-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kevlangat application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});