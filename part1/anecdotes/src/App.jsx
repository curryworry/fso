import { useState } from 'react'

const Button = ({clickHandler}) => {
  return (<button onClick={clickHandler}>next anecdote</button>)
}

const Anecdote = ({number,anecdotes}) => {
  return (
    <div>
      {anecdotes[number]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const randomAnecdote = () => {
    let randomNumber = Math.round(Math.random()*anecdotes.length);
    //console.log('random number is',randomNumber);
    setSelected(randomNumber);
  }

  return (
    <div>
      <Anecdote number={selected} anecdotes={anecdotes}/>
      <Button clickHandler={randomAnecdote}/>
    </div>
  )
}

export default App