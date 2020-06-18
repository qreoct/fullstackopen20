import diagnosisData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getEntries = (): Array<Diagnosis> => {
	return diagnosisData;
};

export default {
	getEntries
};