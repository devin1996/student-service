import * as express from 'express'
import { Request, Response} from 'express'
import * as cors from 'cors'
import { createConnection } from 'typeorm'
import {studentmgt} from "./entity/studentmgt"

createConnection().then(db => {

    const studentRepository = db.getRepository(studentmgt);

    const app = express()

    //for the frontend application
    app.use(cors({
        origin: ["http://localhost:3000"]
    }))

    app.use(express.json())

    //Read all Students
    app.get('/api/students', async(req: Request, res: Response)=>{
        const students = await studentRepository.find()
        
        res.json(students)
    })

    //Create Students
    app.post('/api/students', async(req: Request, res: Response)=>{
        const newstudent = await studentRepository.create(req.body);
        const result = await studentRepository.save(newstudent)

        return res.send(result)
        
    })

    console.log('Listening to post 8000')
    app.listen(8000)
})







