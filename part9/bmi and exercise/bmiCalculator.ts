interface userArgs {
	weight: number;
	height: number;
}
const parseArguments = (args: Array<any>): userArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Input args must be numbers!');
  }
}


export const calculateBmi = (weight: number, height: number): string => {
	console.log('CALCULATEBMI: recvd w:', weight, 'h:', height)
	const bmi:number = (weight / ( (height/100) * (height/100) ) );
	if (bmi<18.5){
		return(`Your BMI of ${bmi} is underweight.`);
	}else if (18.5<=bmi && bmi<23){
		return(`Your BMI of ${bmi} is Healthy.`);
	}else if (23<=bmi && bmi<27.5){
		return(`Your BMI of ${bmi} is overweight.`);
	}else if (27.5<=bmi){
		return(`Your BMI of ${bmi} is severely overweight.`);
	}else {
		return('Error!');
	}
}


try {
	const { height,weight } = parseArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (e) {
	console.log('BMICALC: Error, something bad happened. Info:', e.message);
}

