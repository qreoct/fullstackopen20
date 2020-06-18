const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

import { calculateBmi } from './bmiCalculator.ts'
import { calculateExercises } from './exerciseCalculator.ts'

app.get('/ping', (req, res) => {
	console.log('INDEX: PING: helloworld')
	res.send('pong :)');
});

app.get('/bmi', (req,res) => {
	console.log('INDEX: /BMI: height is', req.query.height);
	console.log('INDEX: /BMI: weight is', req.query.weight);
	if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
		res.status(400).json({error: `INDEX: /BMI: bad inputs`})
	}
	const height: number = req.query.height;
	const weight: number = req.query.weight;
	const answer: string = calculateBmi(weight, height);
	res.json({height, weight, bmi: answer});
});

app.post('/exercises', (req,res) => {
	const body:Array = req.body
	const daily_exercises:Array<number> = body.daily_exercises
	const target:number = body.target
	if (!daily_exercises || !target){
		res.status(400).json({error: `INDEX: /EXERCISES: params missing`})
	} else if (isNaN(target)){
		res.status(400).json({error: `INDEX: /EXERCISES: malformed params`})
	}
	try{
		const answer = calculateExercises(daily_exercises, target)
		res.json(answer);
	} catch(e) {
		res.status(400).json({error: `INDEX: /EXERCISES: Error ${e.message}`})
	}
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});