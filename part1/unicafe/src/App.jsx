import { useState } from 'react'

const Button = ({text, clickHandler}) => {
    return (
        <button onClick={()=>clickHandler({text})}>{text}</button>
    )
}

const Heading = ({text}) =><div><h1>{text}</h1></div>

const Total = ({text,value}) => {
    return (
        <div>{text} {value}</div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const average = (good*1) + (neutral*0) + (bad*-1);
  const positive = `${good/(good+neutral+bad)*100}%`;
  const handleClick = ({text}) => {
    console.log('button clicked, value is',text);
    if(text=='good'){
        console.log('entered good condition');
        setGood(good+1);
    }
    else if(text=='neutral'){
        setNeutral(neutral+1);
    }
    else if(text=='bad'){
        setBad(bad+1);
    }
}

  return (
    <div>
      <Heading text='Give Feedback'/>  
      <Button text='good' clickHandler = {handleClick}/>
      <Button text='neutral' clickHandler = {handleClick}/>
      <Button text='bad' clickHandler = {handleClick}/>
      <Heading text='Statistics'/>
      <Total text='good' value={good}/>
      <Total text='neutral' value={neutral}/>
      <Total text='bad' value={bad}/>
      <Total text='all' value={good+neutral+bad}/>
      <Total text ='average' value={average}/>
      <Total text='positive' value={positive}/>
    </div>
  )
}

export default App