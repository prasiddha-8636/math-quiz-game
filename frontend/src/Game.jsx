import { useState, useEffect } from 'react'

export default function Game({ onFinish }) {
    const [questions, setQuestions] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [timeLeft, setTimeLeft] = useState(30)

    useEffect(() => {
        fetch('http://localhost:8000/api/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (loading || questions.length === 0) return
        if (timeLeft === 0) {
            onFinish(score, questions.length)
            return
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft, loading, questions])

    const handleAnswer = (option) => {
        if (option === questions[currentIdx].answer) {
            setScore(s => s + 1)
        }
        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(i => i + 1)
        } else {
            onFinish(score + (option === questions[currentIdx].answer ? 1 : 0), questions.length)
        }
    }

    if (loading) return <div>Generating challenges...</div>

    return (
        <div>
            <div className="timer">Time Remaining: {timeLeft}s</div>
            <h2>Question {currentIdx + 1} / {questions.length}</h2>
            <p style={{ fontSize: '2rem', margin: '1rem 0' }}>{questions[currentIdx].question}</p>
            <div className="options-grid">
                {questions[currentIdx].options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => handleAnswer(opt)}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}
