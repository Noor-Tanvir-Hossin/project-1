import express, {  Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import {  UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

// const express = require('express')

const app = express()

// const port = 3000

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1',router)
// app.use('/api/v1/users', UserRoutes)



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// app.post('/', (req: Request,res: Response)=>{
//     console.log(req.body);
//     res.send('got data')
    
// })

// app.listen(port, () => {0
//   console.log(`Example app listening on port ${port}`)
// })



app.use(globalErrorHandler)
app.use(notFound)



export default app;