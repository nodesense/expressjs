# Install
    Download and Install Node.js 8.x

Clone the repo, 
    > npm install
    > npm install nodemon -g

Nodemon is for restarting the server automatically when code changes, only for development

    Download and Install MongoDB
    Download and Install Redis

One Mac,
    brew install mongodb
    brew services start mongodb

Or, if you don't want/need a background service you can just run:
    
    mongod --config /usr/local/etc/mongod.conf

# Start the server

Start the server using,

    >npm start


Press ^c to stop the server.
