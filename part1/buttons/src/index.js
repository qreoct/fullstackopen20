import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Count = ({count}) => <p> count now is {count} </p> 

const Button = ({fnc, text}) => {
	return (
		<button onClick = {fnc}>
			{text}
		</button>
	)
}

const App = (props) => {
	const [counter, setCounter] = useState(0)

	const decrease = () => {
		setCounter(counter - 1)
	}

	const reset = () => {
		setCounter(0)
	}

	const increase = () => {
		setCounter(counter + 1)
	}

	return (
		<div>
			<Count count={counter} />
			<Button fnc = {increase} text = "increase" />
			<Button fnc = {decrease} text = "decrease" />
			<Button fnc = {reset} text = "reset" />
		</div>
	)
}


ReactDOM.render( 
  <App />,
  document.getElementById('root')
);
