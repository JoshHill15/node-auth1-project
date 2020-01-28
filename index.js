const server = require("./api/server")
const PORT = 3500


server.listen(PORT, () => console.log(`listening on port ${PORT}`))