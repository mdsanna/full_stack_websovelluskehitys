import { useState } from 'react'


const Statistics = (props) => {

  return (
    <div>
      <h1>Statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
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

    const getSum = () => {
      console.log('getSum')
      return good + neutral + bad
    }

    const getAverage = () => {
      console.log('getAverage')
      return (good*1 + neutral*0 + bad*(-1)) / 3
    }

    const getPositive = () => {
      console.log('getPositive')
      return (good / getSum()) *100 + ' %'
    }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <p>all {getSum()} </p>
      <p>average {getAverage()} </p>
      <p>positive {getPositive()} </p>
    </div>
  )
}

export default App