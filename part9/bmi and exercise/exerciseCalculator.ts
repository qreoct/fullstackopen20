interface Result {
	periodLength: number; // number of days in total
	trainingDays: number; // number of days exercise was done
	success: boolean; // whether target daily hours was reached
	rating: number; // rating from 1 to 3
	ratingDescription: string; // description for rating
	target: number; // target daily hours
	average: number; // average daily hours
}

interface userArgs {
	target: number;
	dailyHours: Array<number>;
}

const parseArguments = (args: Array<any>): userArgs => {
  if (args.length < 4) throw new Error('Not enough arguments! First arg is target and the rest are hours for each day');
  
  if(isNaN(Number(args[2]))){ throw new Error('Target hours must be a number!') }

  let dailyHours:Array<number> = []
  for (let i:number = 3; i<args.length; i++){
  	if(isNaN(Number(args[i]))){ throw new Error('All values must be numbers!') }
  	dailyHours = dailyHours.concat(Number(args[i]))
  }

  return {
  	target: Number(args[2]),
  	dailyHours
  }
}

export const calculateExercises = (dailyHours: Array<number>, targetHours: number): Result => {
	const periodLength : number = dailyHours.length
	const trainingDays : number = dailyHours.filter(d => d>0).length
	const success : boolean = dailyHours.every(d => d>=targetHours)
	const average : number = dailyHours.reduce((a,b) => (a+b)) / periodLength
	let rating : number

	if (success) { rating = 3; }
	else if ((targetHours - average) < 1) { rating =  2; }
	else { rating =  1;}

	let ratingDescription : string
	switch(rating){
		case 3:{ 
			ratingDescription = "Awesome job!";
			break;
		}
		case 2:{
			if( trainingDays < periodLength ) {
				ratingDescription = `Almost there! You missed your target on ${dailyHours.filter(d => d<targetHours).length} days.` 
			}
			break;
		}
		case 1:{ 
			ratingDescription = "Work harder...";
			break;
		}
		default: {break;}
	}
	const target : number = targetHours

	return{
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	}
}

try {
	const { dailyHours, target } = parseArguments(process.argv);
	console.log(calculateExercises(dailyHours, target));
} catch (e) {
	console.log('EXERCISECALC: Error, something bad happened. Info:', e.message);
}