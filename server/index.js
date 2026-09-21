const express = require('express')
const fileupload = require('express-fileupload');
const path = require('path')
const http = require('http'); // native node js http request   
const { Server } = require('socket.io') // init socket io realtime connection
const cors = require('cors');
const route = require('./route');
const { asyncWrapProviders } = require('async_hooks');
const { addUser, findUser, countOnlineRoom, delCountOnline } = require('./users');
const app = express();

app.use(cors({ origin: "*" }));
app.use(route)
app.use(express.static(path.resolve(__dirname, 'static')))

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    socket.on('join', ({ searchParams, file }) => {
        const {name,room} = searchParams

        socket.join(room)
        console.log(file.file)
        const user = addUser({name,room})
        let countOnline = countOnlineRoom(room).length
        

        socket.emit('message', {
            data: {
                user: `${name}`,
                message: "Hello you include chat",
                countOnline
            }
        })

        socket.broadcast.to(room).emit('message', {
            data: {
                user: user,
                message: `Now ${user.user.name} join chat`,
                countOnline
            }
        })

        socket.on('SendMessage', ({params, message})=> {
            const user = findUser(params)
            console.log(params,message)
            if(user){
                io.to(user.room).emit("message",{data: {user,message}})
            }
        })

        socket.on('delSession', ({params}) =>{
            countOnline = delCountOnline(name, countOnlineRoom(params.room)).length+0
            socket.broadcast.to(params.room).emit('message', {data:{
                user:params.name,
                message: `${params.name} left chat`,
                countOnline
            }})
        })
    })

    io.on('disconnect', () => {
        console.log('Disconnect')
    })
})

server.listen(5000, () => {
    console.log('Server is running')
})