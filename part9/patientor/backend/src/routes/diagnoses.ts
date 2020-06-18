import express from 'express';

import diagnosisService from '../services/diagnosisService.ts';

const router = express.Router();

router.get('/', (req, res) => {
	console.log('DIAGNOSES.TS get all');
	const diags = diagnosisService.getEntries();
	res.send(diags);
})

export default router;