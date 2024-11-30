import express, { Request, Response } from 'express';
import cors from 'cors';

// const express = require('express')

const app = express()

// const port = 3000

// parser
app.use(express.json())
app.use(cors())

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.post('/', (req: Request,res: Response)=>{
    console.log(req.body);
    res.send('got data')
    
})

// app.listen(port, () => {0
//   console.log(`Example app listening on port ${port}`)
// })

export default app;