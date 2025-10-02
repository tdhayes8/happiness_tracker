# Happiness Tracker

A small, cheerful app to log daily moods, visualize trends, and discover patterns that help you feel better. Built to be simple, friendly, and extendable — perfect for personal use or as a starting point for a bigger wellbeing project.

## What this app does
- Let users record a short mood entry (score, date, diary note).
- Show an interactive timeline and weekly/monthly summaries.
- Provide gentle visual prompts and streaks to encourage daily reflection.
- Store data locally or on a lightweight backend so you keep control of your wellbeing data.

## Key features
- Quick “one-tap” mood logging
- Trend charts (daily, weekly, monthly)
- Searchable mood history with tags
- Export to CSV for backup or analysis

## Quick setup (full local dev)
Prerequisites:
- Node.js v16+ and npm or yarn
- Git
- (Optional) SQLite or PostgreSQL if using a persisted backend

1. Clone
```
git clone https://github.com/yourname/happiness-tracker.git
cd happiness-tracker
```

2. Install dependencies
- If fullstack with separate folders:
```
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configure environment
Create a `.env` in `server/`:
```
PORT=4000
DATABASE_URL=sqlite:./data/dev.db     # or your postgres connection
JWT_SECRET=your_secret_here
```

4. Initialize database (example for a Node/Prisma or Sequelize setup)
```
cd server
npm run migrate      # or: npx prisma migrate dev
```

5. Run in development
```
# Start backend
cd backend
npm run dev

# In another terminal, start frontend
cd frontend
npm run dev
```
Open http://localhost:3000 (frontend) and http://localhost:4000 (API).

## Usage
- Click “New Entry” or the big happy button to add today’s mood.
- Use tags to group moods (work, family, exercise).
- Visit “Trends” to view charts and export data from Settings.

## Configuration & deployment
- Set environment variables (PORT, DATABASE_URL, NODE_ENV).
- For production, build the frontend (`npm run build`) and serve via static host or reverse-proxy to the backend.
- Use a managed database (Postgres) for multi-device sync.

## Contribution
- Fork, create a feature branch, add tests, and open a PR with a clear description.
- Keep changes focused and include a happy emoji in small UI tweaks for mood.

##Future Improvements
- Add Authentication to allow multiple users to use this app.

## License
MIT — feel free to adapt and share improvements.

Enjoy tracking — small daily steps lead to big smiles!
