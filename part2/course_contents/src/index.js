import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course.js'

const App = () => {
  const courses = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'My new part',
        exercises: 200,
        id: 4
      }
    ]
  },
  {
    id: 2,
    name: 'Ecology',
    parts: [
      {
        name: 'Turtles',
        exercises: 4,
        id: 1
      },
      {
        name: 'Cats',
        exercises: 15,
        id: 2
      },
      {
        name: 'Dolphins',
        exercises: 6,
        id: 3
      },
      {
        name: 'Unicorns',
        exercises: 22,
        id: 4
      }
    ]
  }
  ]

  return (
    <div>
      {courses.map((course) =>
        <Course course={course} key={course.id}/>
      )}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)