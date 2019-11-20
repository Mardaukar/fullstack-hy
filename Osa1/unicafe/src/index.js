import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="Good" clickHandler={() => setGood(good + 1)} />
      <Button text="Neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <Button text="Bad" clickHandler={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good == 0 && neutral == 0 && bad == 0) {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }

    return (
      <>
      <h1>statistics</h1>
      <table>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={good + neutral + bad} />
      <Statistic text="average" value ={(good - bad) / (good + neutral + bad)} />
      <Statistic text="positive" percentage="%" value ={good * 100 / (good + neutral + bad)} />
      </table>
      </>
    )
}

const Button = ({ text, clickHandler }) => {
    return (
        <button onClick={clickHandler}>{text}</button>
    )
}

const Statistic = ({ text, value, percentage }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {percentage}</td>
        </tr>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)