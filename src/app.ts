import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
// const port = 3000

//parsers
app.use(express.json());
app.use(cors());

const getAcontroller= (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}
app.get('/', getAcontroller);

// console.log(process.cwd());

export default app;
