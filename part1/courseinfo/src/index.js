import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<h1> {props.attr.name} </h1>
	)
}

const Part = (props) => {
	return (
		<p> {props.name} {props.count} </p>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part name={props.attr.modules[0].name} count={props.attr.modules[0].exercises} />
			<Part name={props.attr.modules[1].name} count={props.attr.modules[1].exercises} />
			<Part name={props.attr.modules[2].name} count={props.attr.modules[2].exercises} />
		</div>
	)
}

const Total = (props) => {
	return (
		<p> Number of exercises {props.attr.modules[0].exercises + props.attr.modules[1].exercises 
			+ props.attr.modules[2].exercises} </p>
	)
}


const App = () => {
	const course = {
		name: 'Half Stack application development',
		modules: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
			  	exercises: 7
			},
			{
			  	name: 'State of a component',
			  	exercises: 14
			}
		]
	}

  return (
    <div>
      <Header attr = {course} />
      <Content attr = {course} />
      <Total attr = {course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))