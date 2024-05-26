const Header = (props) => {
  //console.log('Header:' + props);
  return (
    <h1>{props.course}</h1>
  );
}

const Course = (props) => {
  //console.log(props);
  return(  
    <div>
      <Part details={props.part[0]}/>
      <Part details={props.part[1]}/>
      <Part details={props.part[2]}/>
    </div>
  )
}

const Part = (props) => {
  //console.log(props);
  return(
    <div>
      <p>{props.details.name} {props.details.exercise}</p>
    </div>
  );
}

const Total = (props) => {
  //console.log(props)
  return (
    <p>Number of Exercises {props.exercises[0]+props.exercises[1]+props.exercises[2]}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Course part={[
        {
        name: part1,
        exercise: exercises1,
        },
        {
          name: part2,
          exercise: exercises2,
        },
        {
          name: part3,
          exercise: exercises3,
        }
      ]}/>
      <Total exercises = {[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App