import { useState } from 'react'
import Game from './Game'
import Scoreboard from './Scoreboard'
import './index.css'

function App() {
  const [gameState, setGameState] = useState('menu') // menu, playing, finished
  const [username, setUsername] = useState('')
  const [lastScore, setLastScore] = useState(null)

  const startGame = () => {
    if (!username.trim()) {
      alert("Please enter a username!")
      return
    }
    setGameState('playing')
  }

  const handleFinish = (score, total) => {
    setLastScore({ score, total })
    setGameState('finished')

    fetch('http://localhost:8000/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, score, total })
    })
  }

  return (
    <div className="app-container">
      <h1>Math Whiz</h1>

      {gameState === 'menu' && (
        <div>
          <input
            className="username-input"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn" onClick={startGame}>Start Quiz</button>
          <Scoreboard />
        </div>
      )}

      {gameState === 'playing' && (
        <Game onFinish={handleFinish} />
      )}

      {gameState === 'finished' && (
        <div>
          <div className="score-display">
            Final Score: {lastScore.score} / {lastScore.total}
          </div>
          <button className="btn" onClick={() => setGameState('menu')}>Play Again</button>
          <Scoreboard />
        </div>
      )}
    </div>
  )
}

export default App
