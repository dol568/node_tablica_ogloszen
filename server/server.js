require("dotenv").config();
const db = require("./container").resolve("dataSource");
const app = require("./app");

(async() => {
  try {
    await db.connect();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
})();