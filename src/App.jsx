import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(1500) // 25分（1500秒）
  const [isRunning, setIsRunning] = useState(false)
  const [session, setSession] = useState('work')
  const [breakTime, setBreakTime] = useState(300) // 5分（300秒）

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    let interval = null
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  useEffect(() => {
    if (time === 0) {
      if (session === 'work') {
        setTime(breakTime)
        setSession('break')
      } else {
        setTime(1500)
        setSession('work')
      }
      setIsRunning(false)
    }
  }, [time, breakTime])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    if (session === 'work') {
      setTime(1500)
    } else {
      setTime(breakTime)
    }
    setIsRunning(false)
  }

  return React.createElement('div', { className: 'app' },
    React.createElement('div', { className: 'timer-container' },
      React.createElement('h1', null, session === 'work' ? '作業時間' : '休憩時間'),
      React.createElement('div', { className: 'time-display' },
        React.createElement('span', null, formatTime(time))
      ),
      React.createElement('div', { className: 'controls' },
        React.createElement('button', { 
          onClick: toggleTimer, 
          className: `button ${isRunning ? 'pause' : 'start'}` 
        }, isRunning ? '一時停止' : '開始'),
        React.createElement('button', { 
          onClick: resetTimer, 
          className: 'button reset' 
        }, 'リセット')
      )
    )
  )
}

export default App
