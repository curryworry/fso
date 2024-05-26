const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course}</h1>
  );
}

const Course = (props) => {
  //console.log(props);
  return(  
    <div>
      <Part details={props.parts[0]}/>
      <Part details={props.parts[1]}/>
      <Part details={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  //console.log(props);
  return(
    <div>
      <p>{props.details.name} {props.details.exercises}</p>
    </div>
  );
}

const Total = (props) => {
  //console.log(props)
  return (
    <p>Number of Exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
      <Header course={course.name}/>
      <Course parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App