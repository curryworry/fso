import { useState } from 'react'

const Heading = ({text}) => {
  return <div><h2>{text}</h2></div>
}

const Button = ({clickHandler, text}) => {
  return (<button onClick={clickHandler}>{text}</button>)
}

const Anecdote = ({number,anecdotes}) => {
  return (
    <div>
      {anecdotes[number]}
    </div>
  )
}

const Stats = ({count}) => {
  return (
    <div>
      has {count} votes
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
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  //console.log(votes);
  //console.log('anecdotes.length is ',anecdotes.length);
  const mostVoted = votes.indexOf(Math.max(...votes));
  //console.log(mostVoted);

  const randomAnecdote = () => {
    let randomNumber = Math.floor(Math.random()*anecdotes.length);
    //console.log('random number is',randomNumber);
    setSelected(randomNumber);
  }

  const vote = () => {
    let newVotes = [...votes];
    //console.log(newVotes);
    newVotes[selected]+=1;
    //console.log(newVotes);
    setVotes(newVotes);
  }

  return (
    <div>
      <Heading text='Anecdote of the day'/>
      <Anecdote number={selected} anecdotes={anecdotes}/>
      <Stats count={votes[selected]}/>
      <Button text='vote' clickHandler={vote}/>
      <Button text='next anecdote' clickHandler={randomAnecdote}/>
      <Heading text='Most voted anecdote'/>
      <Anecdote number={mostVoted} anecdotes={anecdotes}></Anecdote>
    </div>
  )
}

export default App