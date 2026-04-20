# ✊✋✌️ Rock Paper Scissors

A two-player Rock Paper Scissors game for **Sebastian** and **Isabelle**, with a secret **Dad** admin view.

## Quick Start

```bash
docker compose up --build
```

Then open **http://localhost:8080** in a browser (or two!).

---

## How to Play

### Players
- Open the app on **two separate devices** (or two browser windows/tabs)
- **Sebastian** clicks his button, **Isabelle** clicks hers
- Each player secretly picks Rock, Paper, or Scissors
- When both have chosen, the result is revealed automatically!

### Passwords / Login
| Player | Button |
|--------|--------|
| Sebastian | 🎮 Sebastian |
| Isabelle | 🌟 Isabelle |
| Dad (admin) | 👑 Dad |

*(One-click login — no typing needed!)*

---

## Dad's Admin View 👑

Dad sees:
- Live scoreboard (wins, losses, ties)
- Whether each player has submitted their move for the current round
- Full game history with both moves revealed
- A **Reset** button to wipe scores and start fresh

Players only see the emoji of what their opponent played (not the label), keeping it fun.

---

## Ports

| Service | Port |
|---------|------|
| Frontend (game UI) | `8080` |
| Backend (API) | `3001` |

---

## Tech Stack

- **Frontend**: Plain HTML/CSS/JS served by nginx
- **Backend**: Node.js + Express REST API
- **State**: In-memory (resets when the container restarts)
- **Polling**: Frontend polls every 2 seconds for live updates
