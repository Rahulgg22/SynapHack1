// Layout is handled in App.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchScoresByEvent } from "../api/scores";

export default function Leaderboard() {
  const { id } = useParams();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchScoresByEvent(id);
        if (mounted) setScores(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || "Failed to load scores");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Leaderboard 🏆</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {scores.map((entry, index) => (
            <li key={index} className="flex justify-between p-4 border rounded-md shadow">
              <span className="font-semibold">{entry.team_name || entry.team || `Team ${index + 1}`}</span>
              <span>{entry.total_points || entry.points || 0} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
