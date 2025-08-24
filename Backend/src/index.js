import dotenv from 'dotenv'
dotenv.config({ path: '.env', debug: true }) //to supress env logs -- quiet: true

import { app } from "./app.js";
import { connectDb } from "./db/db.js"

import { server } from './socket.js'

const port = 8000


connectDb()
    .then(() => {
        
        app.on('error', (err) => {
            console.log(`Connection err ${err}`)
            throw new Error
        })
        server.listen(port, () => console.log(`⚙️ Server successfully running on port:${port}`))
    })
    .catch((err) => console.log(`Error connecting database ERROR:${err}`))




