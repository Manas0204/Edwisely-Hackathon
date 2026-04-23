import React from "react";

export const LiveLeaderboard = ({ data, username }) => {

  const players = Object.entries(data || {})
    .map(([name, stats]) => ({ username: name, ...stats }))
    .sort((a, b) => b.composite_score - a.composite_score);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      
      {players.length === 0 && (
        <div style={{ color: "#64748b" }}>No players yet...</div>
      )}

      {players.map((p, i) => {
        const isMe = p.username === username;

        return (
          <div key={p.username} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: isMe ? "#1e293b" : "#0f172a",
            padding: "10px 14px",
            borderRadius: "10px",
            border: isMe ? "1px solid #3b82f6" : "1px solid #1e293b"
          }}>

            {/* LEFT */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: i === 0 ? "#facc15" : "#1e293b",
                color: i === 0 ? "#000" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {i + 1}
              </div>

              <span style={{ fontWeight: "500" }}>{p.username}</span>
            </div>

            {/* RIGHT */}
            <div style={{
              color: "#22c55e",
              fontWeight: "700"
            }}>
              {Math.max(0, Math.floor(p.composite_score || 0))}
            </div>

          </div>
        );
      })}
    </div>
  );
};