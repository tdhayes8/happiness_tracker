CREATE TABLE IF NOT EXISTS happiness (
    date DATE PRIMARY KEY,
    score INT NOT NULL CHECK (score >= 1 AND score <= 10),
    entry TEXT
)
