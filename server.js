const PORT = 3000
const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const mongoose = require('mongoose');
const io = require('socket.io')(http)
const usrRoute = require('./routes/usrRoute')
const msgRoute = require('./routes/msgRoute')

app.use(cors())

mongoose.connect('mongodb+srv://dd:avokado@cluster0.9m2g7.mongodb.net/w2022?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
    console.log(err)
    console.log('Error Mongodb connection')
});

app.get("/", (req, res) => {
    res.send("101269485 - Deniz Dogan")
})

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html")
})

io.on('connection', (socket) => {
    socket.emit('welcome', `Welcome User-${socket.id}!`)

    socket.on('message', (data) => {
        const msg = {
            sender: socket.id,
            message: data
        }
       socket.broadcast.emit('newMessage', msg)
    })

    socket.on('join', (roomName) => {
        socket.join(roomName)
        const msg = {
            sender: socket.id,
            message: 'Joined the room successfully'
        }
        io.sockets.emit('newMessage', msg)
    })

    socket.on('room_message', (data) => {
        const msg = {
            sender: socket.id,
            message: data.message
        }
        socket.broadcast.to(data.room).emit('newMessage', msg)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} User disconnected...`)
    })
})


http.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})
