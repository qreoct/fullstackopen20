import express from 'express';
const app = express();
app.use(express.json());

const cors = require('cors')

import diagnosesRouter from './src/routes/diagnoses.ts'
import patientsRouter from './src/routes/patients.ts'

const PORT = 3001;

app.use(cors())

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});