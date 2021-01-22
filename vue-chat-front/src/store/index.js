import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ----------------------------------------------------------
// Vuex module for Login
// ----------------------------------------------------------
const moduleLogin = {

    state: {
        
        login: false,
        user: null
  
    },
  
    mutations: {
  
        /** 
         * Add a user to the state
         * 
         * @param state
         * @param user
         * 
         */

        SET_LOGIN_USER( state, user ) {

            state.user = user
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(user))

        },

        /** 
         * Add the socket id to the log user
         * 
         * @param state
         * @param socket String
         * 
         */
        SET_LOGIN_USER_SOCKET( state, socket ) {

            state.user.socket = socket

        },

        /** 
         * Set login
         * 
         * @param state
         * @param login Boolean
         * 
         */

        SET_LOGIN( state, login ) {

            state.login = login

        }
  
    },
  
    getters: {
  
        /** 
         * Return the current users
         * 
         * @param state
         * 
         */

        getLoginUser: state => {

            return state.user

        },

        /** 
         * Return the current users
         * 
         * @param state
         * 
         */

        getLogin: state => {

            return state.login

        }
  
    }
  
}

// ----------------------------------------------------------
// Vuex module for Users
// ----------------------------------------------------------
const moduleUsers = {

  state: {

        users: []

  },


    mutations: {

        /** 
         * Add a user to the state
         * 
         * @param state
         * @param user
         * 
         */

        SET_USER( state, user ) {

            let online = state.users.find(u => u.socket === user.socket)
            let name = state.users.find(u => u.name === user.name)

            if(typeof online === 'undefined' && typeof name === 'undefined' ) {

                state.users.push(user)

            } else if (typeof name !== 'undefined') {

                let user_index = state.users.indexOf(name)
                state.users[user_index].socket = user.socket

            }

        },

        /** 
         * Remove a user
         *
         * @param socket
         * 
         */

        REMOVE_USER( state, socket ) {

            let user_object = state.users.find(user => user.socket === socket)
            let user_index = state.users.indexOf(user_object)

            state.users.splice(user_index, 1)

        }

    },

    getters: {

        /** 
         * Return the current users
         * 
         * @param state
         * 
         */

        getUsers: state => {

            return state.users

        },
        
        /** 
         * Get user by name
         * 
         * @param user Object
         * 
         */

        getUser: (state) => (user) => {

            let user_object = state.users.find(u => u.name === user.name)

            if(typeof user_object !== 'undefined') {

                return user_object

            }

        },

        /** 
         * Get user by socket
         * 
         * @param socket String
         * 
         */

        getUserBySocket: (state) => (socket) => {

            let user_object = state.users.find(u => u.socket === socket)

            if(typeof user_object !== 'undefined') {

                return user_object

            }

        }

    }

}

// ----------------------------------------------------------
// Vuex module for Messages
// ----------------------------------------------------------
const moduleMessages = {

    state: {
  
        messages: []
  
    },
  
  
    mutations: {

        /** 
         * Add a message to the state
         * 
         * @param state
         * @param message
         * 
         */

        SET_MESSAGE( state, messages) {

            state.messages.push(messages)

        }

    },
  
    getters: {
  
        /** 
         * Return the current messages
         * 
         * @param state
         * 
         */
  
        getMessages: state => {

            return state.messages

        }
  
    }
  
}

// ----------------------------------------------------------
// Vuex module for Who is typing
// ----------------------------------------------------------
const moduleTyping = {

    state: {
        
        who: []

    },

    mutations: {
  
        /** 
         * Add a user to the state
         * 
         * @param state
         * @param user
         * 
         */

        SET_WHO_USER( state, user ) {

            state.who.unshift(user)

        },

        /** 
         *  Remove a user from the state
         * 
         * @param state
         * @param socket
         * 
         */

        REMOVE_WHO_USER( state, socket ) {

            let user_object = state.who.find(user => user.socket === socket)
            let user_index = state.who.indexOf(user_object)

            state.who.splice(user_index, 1)

        },
  
    },

    getters: {
  
        /** 
         * Return who is typing
         * 
         * @param state
         * 
         */
  
        getWhoIsTyping: state => {

            return state.who

        }
  
    }

}

// ----------------------------------------------------------
// Vuex modules
// ----------------------------------------------------------
const store =  new Vuex.Store({

    modules: {

        login: moduleLogin,
        users: moduleUsers,
        messages: moduleMessages,
        typing: moduleTyping

    }

})

export default store