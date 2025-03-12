const app = require("./config/server");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 User service running on port ${PORT}`));
