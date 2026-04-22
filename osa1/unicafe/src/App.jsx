import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = (props) => {

    const getSum = () => {
      return props.good + props.neutral + props.bad
    }

    const getAverage = () => {
      return (props.good*1 + props.neutral*0 + props.bad*(-1)) / 3
    }

    const getPositive = () => {
       return (props.good / getSum()) *100 + ' %'
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
      <table>
          <tbody>
            <StatisticsLine text='good' value={props.good} /> 
            <StatisticsLine text='neutral' value={props.neutral} />
            <StatisticsLine text='bad' value={props.bad} /> 
            <StatisticsLine text='all' value={getSum()} />
            <StatisticsLine text='average' value={getAverage()} />
            <StatisticsLine text='positive' value={getPositive()} />
          </tbody>
        </table>
      </div>
  )
}

const Button = (props) => {
 
   return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text='good'/>
      <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={() => setBad(bad+1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App