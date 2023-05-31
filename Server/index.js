const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config(__dirname + "/.env");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pageRoutes = require("./routes/pages");
const todosRoutes = require("./routes/api/todo");
const authRoutes = require("./routes/api/auth");
const { initialiseDB } = require("./utils/db");
const { authMiddleware, logger } = require("./middleware/index");

const PORT = 8080;

initialiseDB();

app.use(cors());
app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use("/", pageRoutes);
app.use("/api/todos", authMiddleware, todosRoutes);
app.use("/api/auth", authRoutes);

// todos endpoints

app.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  return res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT:${PORT}`);
});
