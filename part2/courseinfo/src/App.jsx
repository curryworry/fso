const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => 
{
  /*let exercises = parts.map(part => part.exercises)
  console.log(exercises);
  const sum = exercises.reduce((sum,exercise) => sum + exercise,0)*/
  const total = parts.reduce((sum,part) =>  sum + part.exercises,0)
  return (<div><h3>Total of {total} exercises</h3></div>)
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
console.log(parts); 
return parts.map(
  (part) => <Part key={part.id} part={part}/>
)
}

const Course = ({courses}) => {
  console.log('course are',courses);
  return courses.map((course)=>
  <div key={course.id}>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return <Course courses={courses}/>
}

export default App