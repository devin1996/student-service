import * as express from 'express'
import { Request, Response } from 'express'
import * as cors from 'cors'
import { createConnection } from 'typeorm'
import { studentmgt } from "./entity/studentmgt"
//importing amqlib 
import * as amqp from 'amqplib/callback_api'

createConnection().then(db => {

    const studentRepository = db.getRepository(studentmgt);

    amqp.connect('amqps://wmqmekbr:RCf9DHx6XLA0lpx7gk1T8OOT1x7Ax0eo@bonobo.rmq.cloudamqp.com/wmqmekbr', (error0, connection) => {
        if (error0) {
            throw error0
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1
            }

            const app = express()

            //for the frontend application
            app.use(cors({
                origin: ["http://localhost:3000"]
            }))

            app.use(express.json())

            //Read all Students as an array
            app.get('/api/students', async (req: Request, res: Response) => {
                const students = await studentRepository.find()
                //amqlib testing
                channel.sendToQueue('testing123', Buffer.from('Hello from the other Side'))
                res.json(students)
            })

            //Retrive a Single user a a single entity
            app.get('/api/students/:id', async (req: Request, res: Response) => {
                const oneStudent = await studentRepository.findOne(req.params.id)

                return res.json(oneStudent)
            })

            //Create Students
            app.post('/api/students', async (req: Request, res: Response) => {
                const newstudent = await studentRepository.create(req.body);
                const result = await studentRepository.save(newstudent)

                return res.send(result)

            })

            //update a student
            app.put('/api/students/:id', async (req: Request, res: Response) => {
                const updatestudent = await studentRepository.findOne(req.params.id);
                studentRepository.merge(updatestudent, req.body)
                const result = await studentRepository.save(updatestudent)

                return res.send(result)

            })

            //delete a student
            app.delete('/api/students/:id', async (req: Request, res: Response) => {

                const result = await studentRepository.delete(req.params.id)
                return res.send(result)

            })

            //Disabling a student
            app.post('/api/students/:id/disable', async (req: Request, res: Response) => {

                const disablestudent = await studentRepository.findOne(req.params.id);
                disablestudent.isDisabled = true
                const result = await studentRepository.save(disablestudent)

                return res.send(result)

            })


            console.log('Listening to post 8000')
            app.listen(8000)
        })

    })

})







