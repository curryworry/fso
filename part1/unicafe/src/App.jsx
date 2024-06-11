import { useState } from 'react'

const Button = ({text, clickHandler}) => {
    return (
        <button onClick={()=>clickHandler({text})}>{text}</button>
    )
}

const Heading = ({text}) =><div><h1>{text}</h1></div>

const StatisticLine = ({text,value}) => {
    //console.log('text is ',text);
    //console.log('value is', value);
    return (
        <div>{text} {value}</div>
    )
}

const Statistics = ({details}) => {
    console.log('good is',details.good);
    const average = (details.good*1) + (details.neutral*0) + (details.bad*-1);
    const positive = `${details.good/(details.good+details.neutral+details.bad)*100}%`;
    return (
      <div>
        <StatisticLine text='good' value={details.good}/>
        <StatisticLine text='neutral' value={details.neutral}/>
        <StatisticLine text='bad' value={details.bad}/>
        <StatisticLine text='all' value={details.good+details.neutral+details.bad}/>
        <StatisticLine text ='average' value={average}/>
        <StatisticLine text='positive' value={positive}/>
      </div>  
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const StatObject = {
    'good' : good,
    'bad' : bad,
    'neutral' : neutral,
  }
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
      <Statistics details = {StatObject}/>
      
    </div>
  )
}

export default App