import express, { Request, Response } from 'express';
import compression from 'compression';

const app = express();
const port = 3000;

let counter = 0;

interface HelloResponse {
  counter: number;
}
app.use(compression());
app.use((_req: Request, res: Response<void>, next: () => void) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/counter', (_req: Request, res: Response<HelloResponse>) => {
  res.json({ counter });
});

app.post('/api/counter', (_req: Request, res: Response<HelloResponse>) => {
  counter = counter + 1;
  res.json({ counter });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
