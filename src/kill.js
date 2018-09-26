const kill = require('kill-port')
const http = require('http')
const port = 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })

    res.end('Hi!')
})

server.listen(port, () => {
    setTimeout(() => {
        kill(port)
            .then(console.log)
            .catch(console.log)
    }, 1000)
})