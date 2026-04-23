import React, { useState, useEffect } from "react";
import { useRaceSocket } from "./useRaceSocket";
import { CodeEditor } from "../editor/CodeEditor";
import { LiveLeaderboard } from "../leaderboard/LiveLeaderboard";

export const RaceArena = ({ raceId, username }) => {
  const { leaderboard, testResults, sendAction } = useRaceSocket(raceId, username);

  const [code, setCode] = useState("");

  // 🔥 TIMER (15 min)
  const [time, setTime] = useState(15 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "linear-gradient(135deg, #020617, #0f172a)",
      color: "#e2e8f0",
      padding: "24px",
      gap: "24px",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* LEFT */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* HEADER */}
        <div style={{
          background: "#020617",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #1e293b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontWeight: "600" }}>main.py</span>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => sendAction("RUN_TESTS", code)}
              style={{
                background: "#3b82f6",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Run Tests
            </button>

            <button
              onClick={() => sendAction("SUBMIT_FINAL", code)}
              style={{
                background: "#22c55e",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </div>
        </div>

        {/* EDITOR */}
        <CodeEditor setCode={setCode} />

        {/* TEST RESULTS */}
        <div style={{
          padding: "12px",
          borderRadius: "8px",
          background:
            testResults?.passed_tests === testResults?.total_tests
              ? "#022c22"
              : "#2b0b0b",
          border: "1px solid #1e293b"
        }}>
          <strong>
            Passed {testResults?.passed_tests || 0} / {testResults?.total_tests || 1}
          </strong>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* TIMER */}
        <div style={{
          background: "#020617",
          border: "1px solid #1e293b",
          padding: "16px",
          borderRadius: "10px"
        }}>
          <div style={{ color: "#94a3b8", fontSize: "12px" }}>Time Remaining</div>
          <div style={{ fontSize: "28px", fontWeight: "700" }}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>

        {/* LEADERBOARD */}
        <div style={{
          background: "#020617",
          border: "1px solid #1e293b",
          padding: "16px",
          borderRadius: "10px",
          flex: 1
        }}>
          <h3 style={{ marginBottom: "12px" }}>Leaderboard</h3>
          <LiveLeaderboard data={leaderboard} username={username} />
        </div>

      </div>
    </div>
  );
};