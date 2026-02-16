import { useState, useEffect } from 'react'

export default function Scoreboard() {
    const [scores, setScores] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/scores')
            .then(res => res.json())
            .then(data => setScores(data))
    }, [])

    return (
        <div>
            <h2 style={{ marginTop: '2rem' }}>Recent Scores</h2>
            <table className="scoreboard-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((s, i) => (
                        <tr key={i}>
                            <td>{s.username}</td>
                            <td>{s.score}/{s.total}</td>
                            <td>{new Date(s.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
