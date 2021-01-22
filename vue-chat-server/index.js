const http = require('http')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const Users = require('./controllers/users.controller.js')
const app = express()

const us = new Users()

// -------------------------------------------------------------
// Simple api endpoint for fake login users
// -------------------------------------------------------------
app.use(cors())

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.post('/user', (req, res) => {
    let user = req.body.user
    let user_db = us.getUser(user.name)
    let user_online = us.checkUserOnline(user.name)
    if(typeof user_db !== 'undefined' && !user_online) {
        let user_res = {
            name: user.name,
            avatar: user_db.avatar
        }
        if(user_db.password === user.password) {
            res.json({
                code: 200,
                user: user_res
            })
        } else {
            res.json({
                code: 400,
                error: 'Incorrect password'
            })
        }
    } else {
        res.json({
            code: 400,
            error: 'This user is currently online or not exits'
        })
    }
});

// -------------------------------------------------------------
// Send to the Vue front all GET requests
// -------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, '../vue-chat-front/dist/')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vue-chat-front/dist/', './index.html'))
});

// -------------------------------------------------------------
// Socket.IO
// -------------------------------------------------------------
const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    let handshakeData = socket.request;
    let user_name = handshakeData._query['user']
    let socket_id = socket.id
    us.setUserOnline(user_name, socket_id)
    /**
     * Broadcast list of users online to client who just connect
     */
    socket.emit('getUsersOnline', {
        users: us.getUsersOnline()
    })

    /**
     * Send the new user to the rest on the clients
     */

    let new_user_online = us.getUserOnline(socket_id)
    socket.broadcast.emit('getNewUserOnline', new_user_online)

    /**
     * New message from a user
     * @param message Object
     */
    
    socket.on('sendNewMessage', (message) => {
        // To all users except sender
        socket.broadcast.emit('getNewMessage', message)
    })

    /**
     * New who is typing
     * @param message Object
     */

    socket.on('typing', (message) => {
        // To all users except sender
        socket.broadcast.emit('getWhoIsTyping', socket_id)
    })

    /**
     * Client disconnect
     */
    
    socket.on('disconnect', () => {
        us.setUserOffline(socket_id)
        io.emit('getUserOffline', {
            socket: socket_id
        })
    })
})

// -------------------------------------------------------------
// Server Up
// -------------------------------------------------------------
server.listen(process.env.PORT || '3006', function () {
    console.log('Server app listening on port 3006!')
});