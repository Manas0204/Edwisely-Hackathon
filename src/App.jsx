import React, { useState, useEffect } from 'react';
import { RaceArena } from './features/arena/RaceArena';

function App() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(`Player_${Math.floor(Math.random() * 1000)}`);
    }, []); // ✅ FIXED

    if (!username) return <div>Loading...</div>;

    return (
        <div>
            <RaceArena raceId="hackathon-main-event" username={username} />
        </div>
    );
}

export default App;