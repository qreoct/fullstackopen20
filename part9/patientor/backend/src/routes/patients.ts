import express from 'express';

import patientsService from '../services/patientsService.ts';

const router = express.Router();

router.get('/', (req, res) => {
	console.log('PATIENTS.TS get all');
	const ptnts = patientsService.getPatients();
	res.send(ptnts);
})

export default router;