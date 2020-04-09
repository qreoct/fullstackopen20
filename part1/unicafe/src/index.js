import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({fnc, text}) => {
	return (<button onClick = {fnc}> {text} </button>)
}

const Stats = ({val, text}) => {
	if (text === "Positive") {
		return(
			<tr>
				<td> {text} </td>
				<td> {val} % </td>
			</tr>
		)
	}
	else {
		return (
			<tr>
				<td> {text} </td>
				<td> {val} </td>
			</tr>
		)
	}
}

const StatsTable = ({labels, values}) => {
	return(
		<div>
		<h2> Statistics </h2>
		<table>
		<tbody>
			<Stats val = {values[0]} text = {labels[0]} />
			<Stats val = {values[1]} text = {labels[1]} />
			<Stats val = {values[2]} text = {labels[2]} />
			<Stats val = {values[3]} text = {labels[3]} />
			<Stats val = {values[4]} text = {labels[4]} />
			<Stats val = {values[5]} text = {labels[5]} />
		</tbody>
		</table>
		</div>
	)
}

const App = () => {

	const [great, setGreat] = useState(0)
	const [okay, setOkay] = useState(0)
	const [poor, setPoor] = useState(0)
	const [total, setTotal] = useState(0)

	let avg = (great-poor)/total;
	let pos = (great/total)*100;

	const changeGreat = () => {
		setGreat(great + 1)
		setTotal(total + 1)
	}
	const changeOkay = () => {
		setOkay(okay + 1)
		setTotal(total + 1)
	}
	const changePoor = () => {
		setPoor(poor + 1)
		setTotal(total + 1)
	}

	let labels = ['Great','Okay','Poor','Total','Average','Positive']
	let values = [great,okay,poor,total,avg,pos]

	if (total === 0){
	return(
		<div>
		<h1> Welcome to Unicafe! Please click on a button to leave a review! </h1>
		<h2> Give Feedback </h2>
		<Button fnc = {changeGreat} text = "Great" />
		<Button fnc = {changeOkay} text = "Okay" />
		<Button fnc = {changePoor} text = "Poor" />
		<h2> Statistics </h2>
		<p> No feedback submitted yet! </p>
		</div>
	)}else{
		return(
		<div>
		<h1> Welcome to Unicafe! Please click on a button to leave a review! </h1>
		<h2> Give Feedback </h2>
		<Button fnc = {changeGreat} text = "Great" />
		<Button fnc = {changeOkay} text = "Okay" />
		<Button fnc = {changePoor} text = "Poor" />
		<StatsTable labels = {labels}
				    values = {values} />
		</div>
	)}
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
