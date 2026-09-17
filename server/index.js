const express = require('express')
const http = require('http'); // native node js http request   
const { Server } = require('socket.io') // init socket io realtime connection
const cors = require('cors');
const route = require('./route');
const { asyncWrapProviders } = require('async_hooks');
const { addUser } = require('./users');
const app = express();

app.use(cors({ origin: "*" }));
app.use(route)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }) => {
        socket.join(room)

        const user = addUser({ name, room })

        console.log(user)

        socket.emit('message', {
            data: {
                user: `${name}`,
                message: "Hello you include chat"
            }
        })

        socket.broadcast.to(room).emit('message', {
            data: {
                user: user,
                message: `Now ${user} join chat`
            }
        })
    })

    io.on('disconnect', () => {
        console.log('Disconnect')
    })
})

server.listen(5000, () => {
    console.log('Server is running')
})