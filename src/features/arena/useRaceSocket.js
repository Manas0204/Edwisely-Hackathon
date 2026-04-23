import { useState, useEffect, useRef, useCallback } from 'react';

export const useRaceSocket = (raceId, username) => {
    const [leaderboard, setLeaderboard] = useState({});
    const [testResults, setTestResults] = useState(null);
    const [raceStatus, setRaceStatus] = useState("in_progress");
    const [winner, setWinner] = useState(null);

    const wsRef = useRef(null);

    useEffect(() => {
        const url = `ws://localhost:8000/api/v1/race/${raceId}?username=${username}`;
        const socket = new WebSocket(url);

        socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data);
            
            // Utilize functional state updates to prevent stale closure race conditions
            switch (parsed.event) {
                case "LEADERBOARD_UPDATE":
                    setLeaderboard(parsed.data);
                    break;
                case "TEST_RESULTS":
                    setTestResults(parsed.data);
                    break;
                case "RACE_OVER":
                    setRaceStatus("ended");
                    setWinner(parsed.winner);
                    break;
                case "ERROR":
                    console.error(parsed.message);
                    break;
                default:
                    break;
            }
        };

        wsRef.current = socket;

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [raceId, username]);

    const sendAction = useCallback((action, code) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ action, code }));
        }
    },);

    return { leaderboard, testResults, raceStatus, winner, sendAction };
};