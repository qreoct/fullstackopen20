import patientsData from '../../data/patients.json';

import { Patient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): Array<Patient> => {
	return patientsData.map(({id, name, dateOfBirth, gender, occupation})=> ({
	id,
	name,
	dateOfBirth,
	gender,
	occupation
	}));
};

export default {
	getPatients
};