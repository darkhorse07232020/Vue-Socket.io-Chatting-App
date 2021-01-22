# Realtime chat with Vue and Node ala WhatsApp

Working example: [https://vuechat.amparo.dev/](https://vuechat.amparo.dev/)

Avaliable user:password

~~~ js
iban:12345
gorka:12345
manu:12345
juancarlos:12345
javier:12345
luis:12345
edurne:12345 
angel:12345 
patricia:12345 
alex:12345 
gemma:12345 
alberto:12345 
iñigo:12345 
jonathan:12345 
nayra:12345 
fran:12345 
estíbaliz:12345 
~~~

What is this and what not.

Its a chat room ala **WhatsApp** (simplified very much). I build it for fun and learning purposes.

This has no data persistence, no database, the server only gets the messages and broacast them to the clients, the users data is a JSON file and the management of who is online is an array.

It has two parts :

## Frontend: Vue.js (the client side)

Its in the folder **vue-chat-front** for development:

~~~ bash

cd vue-chat-front
npm install
npm run serve

~~~

For production:

~~~ bash

cd vue-chat-front
npm run build

~~~

The ports and domains are configurable via **.env.development** y **.env.production**.

Use this software besides from Vue itself:

* For generate the audio notifications [tonejs.github.io](https://tonejs.github.io/)
* Vuex [vuex](https://vuex.vuejs.org/guide/modules.html)
* Websocket client [socket.io - client](https://socket.io/)

## Backend: Node.js

No data persistence, no database, the server only gets the messages and broacast them to the clients.

User management is a simple class: [User controller](https://github.com/IbanMM/vue-chat/blob/master/vue-chat-server/controllers/users.controller.js)

Users data (is a JSON file): [Users](https://github.com/IbanMM/vue-chat/blob/master/vue-chat-server/data/users.json)


What id does?:

* Creates a http server with a simple API end point for the login.
* All the rest of get request are redirected to 'vue-chat-front/dist', the front side.
* Creates a Socket.io server.


With what?:

* Http server [Express.js](https://expressjs.com/)
* Websockets server [socket.io - server](https://socket.io/)
* CORS [cors](https://github.com/expressjs/cors)


Is in the folder **vue-chat-serve** to get it up & running:

~~~ bash

cd vue-chat-server
npm install
node index.js

~~~

In production I use [pm2](https://pm2.keymetrics.io/).