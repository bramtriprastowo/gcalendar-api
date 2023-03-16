const app = require("./index")

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;
app.listen(PORT, () => console.log(`Server: ${HOST}:${PORT}`));