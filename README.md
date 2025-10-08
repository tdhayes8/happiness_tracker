# Happiness Tracker

A small, cheerful app to log daily moods, visualize trends, and discover patterns that help you feel better. Built to be simple, friendly, and extendable — perfect for personal use or as a starting point for a bigger wellbeing project.

<img width="1131" height="830" alt="image" src="https://github.com/user-attachments/assets/2b0e169c-9418-4562-827e-ed393336ea3d" />

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


3. Initialize database (example for a Node/Prisma or Sequelize setup)
```
cd backend
npm run migrate      # or: npx prisma migrate dev
```

4. Run in development (with conncurrently @ project root)
```
npm run dev
```
Open http://localhost:5173 (frontend) and http://localhost:5001 (API).


## Configuration & deployment
- Set environment variables (PORT, DATABASE_URL, NODE_ENV).
- Use a managed database (Postgres) for multi-device sync.

## Contribution
- Fork, create a feature branch, add tests, and open a PR with a clear description.

## Future Improvements
- Add Authentication to allow multiple users to use this app.

## License
MIT — feel free to adapt and share improvements.

Enjoy tracking — small daily steps lead to big smiles!



