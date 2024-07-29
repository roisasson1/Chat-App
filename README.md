# ChatApp
I built it with Express server connected to database in MongoDB.

**Tech stack:** MERN + Socket.io + TailwindCSS + Daisy UI

**Authentication && Authorization with JWT**

**Real-time messaging with Socket.io:** 
we added another server (socket server) on top of our express server. 
we'll be able to send a message to our server, it's going to save it to the db, 
and immedietely send it back to this user. in this way this user didn't need to refresh his page (real time).

**Online user status** (Socket.io and React Context)

**Global state management** with Zustand

**Error handling** both on the server and on the client
