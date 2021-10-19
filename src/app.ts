import * as express from 'express'
import * as cors from 'cors'

const app = express()

//for the frontend application
app.use(cors({
    origin: ["http://localhost:3000"]
}))

app.use(express.json())

console.log('Listening to post 8000')
app.listen(8000)



