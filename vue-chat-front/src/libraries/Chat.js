/**                  
 *  _____    _____ ___________ _______  ____  
 *  \__  \  /     \\____ \__  \\_  __ \/  _ \ 
 *   / __ \|  Y Y  \  |_> > __ \|  | \(  <_> )
 *  (____  /__|_|  /   __(____  /__|   \____/ 
 *       \/      \/|__|       \/              
 * 
 * Class for chat functionality
 * Uses https://socket.io/
 *
 */

import io from 'socket.io-client'
import Sound from '@/libraries/Sound'
import store from '@/store'

class Chat {

    constructor() {

        this.audio = new Sound

        this.vuex = store

        this.socket

        this.connect()

    }

    /**
     * Open connection to the server
     */
    connect(){

        let user = this.vuex.getters.getLoginUser
        let user_name = user.name

        this.socket_url = 'https://'

        this.socket_url += `${process.env.VUE_APP_API_DOMAIN}`

        if(process.env.VUE_APP_API_DOMAIN != '') {

            this.socket_url += `:${process.env.VUE_APP_API_PORT}`

        }
        
        this.socket = io.connect( this.socket_url, { secure: true, query: `user=${user_name}` } )

        this.socket.on('getUsersOnline', (data) => {

            this.vuex.commit('SET_LOGIN_USER_SOCKET', this.socket.id)
            this.setListOfUsers(data.users)
            
        })

        this.socket.on('getUsersOnline', (data) => {

            this.setListOfUsers(data.users)
            
        })

        this.socket.on('getNewUserOnline', (data) => {

            this.setNewUserOnline(data)
            
        })

        this.socket.on('getUserOffline', (data) => {

            this.setUserOffline(data.socket)
            
        })

        this.socket.on('getNewMessage', (message) => {

            this.getNewMessage(message);
            
        })

        this.socket.on('getWhoIsTyping', (socket) => {

            this.getWhoIsTyping(socket);
            
        })
        
    }

    /**
     * Create list of users
     * 
     * @param users Array
     * 
     */
    
    setListOfUsers(users) {

        let user_logged = this.vuex.getters.getLoginUser

        users.forEach(user => {

            if(user.name != user_logged.name ) {

                this.vuex.commit('SET_USER', user)

            }

        })

    }

    /**
     * Add new user online
     * 
     * @param user Object
     * 
     */

    setNewUserOnline(user) {

        this.vuex.commit('SET_USER', user)

    }

    /**
     * Remove user online
     * 
     * @param socket String
     * 
     */

    setUserOffline(socket) {

        this.vuex.commit('REMOVE_USER', socket)

    }

    /**
     * When a new connection is created
     * 
     * @param user Object
     * 
     */

    emitNewConnection() {

        let user = this.vuex.getters.getLoginUser

        this.socket.emit('connection', user)

    }

    /**
     * When a user is typing
     */

    emitWhoIsTyping() {

        let user = this.vuex.getters.getLoginUser

        this.socket.emit('typing', user.id)

    }

    /**
     * When a user is typing
     * 
     * @param socket String
     * 
     */

    getWhoIsTyping(socket) {

        let user = this.vuex.getters.getUserBySocket(socket)

        let user_who = {
            id: this.createID(),
            name: user.name,
            avatar: user.avatar,
            socket: socket
        }

        this.vuex.commit('SET_WHO_USER', user_who)

    }

    /**
     * New message from server
     * 
     * @param message Object
     * 
     */

    getNewMessage(message) {

        this.audio.playNotification()
        
        this.vuex.commit('SET_MESSAGE', message)

    }
    
    /**
     * New message to the server
     * 
     * @param text String
     * 
     */

    emitNewMessage(text,socket) {

        let id = this.createID()

        let date = new Date(id)
        let hours = this.add0(date.getHours())
        let minutes = this.add0(date.getMinutes())

        let message = {
            id: id,
            socket: socket,
            text: text,
            date: `${hours}:${minutes}`,
            state: 'send',
            own: false
        }

        this.socket.emit('sendNewMessage', message)

        message.own = true
        
        this.vuex.commit('SET_MESSAGE', message)

    }

    /**
     * Return a timestamp to use as id
     * 
     * @param message Object
     * 
     */

    createID() {

        let id =  new Date().getTime()

        return id

    }

    /**
     * Add 0 to 1 digit values
     * 
     * @param value Number
     * 
     */

    add0(value) {

        if(value < 10) {

            return '0' + value

        } else {

            return value

        }

    }

}

export default Chat