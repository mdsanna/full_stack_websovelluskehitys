import { useState } from 'react'


const Statistics = (props) => {

    const getSum = () => {
      return props.good + props.neutral + props.bad
    }

    const getAverage = () => {
      return (props.good*1 + props.neutral*0 + props.bad*(-1)) / 3
    }

    const getPositive = () => {
       return (props.good / getSum(props)) *100 + ' %'
    }

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {getSum()} </p>
      <p>average {getAverage()} </p>
      <p>positive {getPositive()} </p>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


    const handleGoodClick = () => { 
      setGood(good + 1)
    }
    const handleNeutralClick = () => { 
      setNeutral(neutral + 1)
    }

    const handleBadClick = () => { 
      setBad(bad + 1)
    }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App