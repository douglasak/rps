const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// In-memory state
const USERS = {
  sebastian: { password: 'sebastian', role: 'player', displayName: 'Sebastian' },
  isabelle: { password: 'isabelle', role: 'player', displayName: 'Isabelle' },
  dad: { password: 'dad123', role: 'admin', displayName: 'Dad 👑' },
};

let currentRound = {
  sebastian: null,
  isabelle: null,
};

let gameHistory = [];
let roundNumber = 1;

function getWinner(a, b) {
  if (a === b) return 'tie';
  if (
    (a === 'rock' && b === 'scissors') ||
    (a === 'scissors' && b === 'paper') ||
    (a === 'paper' && b === 'rock')
  ) return 'sebastian';
  return 'isabelle';
}

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS[username?.toLowerCase()];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ username: username.toLowerCase(), role: user.role, displayName: user.displayName });
});

// Submit move
app.post('/api/move', (req, res) => {
  const { username, move } = req.body;
  if (!['rock', 'paper', 'scissors'].includes(move)) {
    return res.status(400).json({ error: 'Invalid move' });
  }
  if (!['sebastian', 'isabelle'].includes(username)) {
    return res.status(403).json({ error: 'Only players can submit moves' });
  }
  if (currentRound[username]) {
    return res.status(400).json({ error: 'Already submitted this round' });
  }
  currentRound[username] = move;

  // Check if both have submitted
  if (currentRound.sebastian && currentRound.isabelle) {
    const winner = getWinner(currentRound.sebastian, currentRound.isabelle);
    const result = {
      round: roundNumber++,
      sebastianMove: currentRound.sebastian,
      isabelleMove: currentRound.isabelle,
      winner,
      timestamp: new Date().toISOString(),
    };
    gameHistory.unshift(result);
    currentRound = { sebastian: null, isabelle: null };
    return res.json({ status: 'complete', result });
  }

  res.json({ status: 'waiting', message: 'Waiting for other player...' });
});

// Get game state
app.get('/api/state', (req, res) => {
  const { username } = req.query;
  res.json({
    hasSubmitted: username ? !!currentRound[username] : null,
    sebastianReady: !!currentRound.sebastian,
    isabelleReady: !!currentRound.isabelle,
    history: gameHistory,
    roundNumber,
    scores: computeScores(),
  });
});

function computeScores() {
  const scores = { sebastian: 0, isabelle: 0, ties: 0 };
  gameHistory.forEach(g => {
    if (g.winner === 'sebastian') scores.sebastian++;
    else if (g.winner === 'isabelle') scores.isabelle++;
    else scores.ties++;
  });
  return scores;
}

// Admin reset
app.post('/api/reset', (req, res) => {
  const { username } = req.body;
  if (username !== 'dad') return res.status(403).json({ error: 'Admin only' });
  gameHistory = [];
  currentRound = { sebastian: null, isabelle: null };
  roundNumber = 1;
  res.json({ success: true });
});

app.listen(3001, () => console.log('RPS backend running on port 3001'));
