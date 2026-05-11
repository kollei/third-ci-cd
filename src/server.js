const app = require("./app");
const { initDb } = require("./db");

const PORT = process.env.PORT || 3000;

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
        process.exit(1);
    });