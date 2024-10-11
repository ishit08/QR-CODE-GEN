//** Queries Module:**

// app/api/queries/tableQueries.js
export const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  );
  CREATE TABLE IF NOT EXISTS subscription_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price TEXT
  );
  CREATE TABLE IF NOT EXISTS features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS plan_features (
    plan_id INTEGER,
    feature_id INTEGER,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id),
    FOREIGN KEY (feature_id) REFERENCES features(id)
  );
  CREATE TABLE IF NOT EXISTS user_subscriptions (
    user_id INTEGER,
    plan_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
  );
  CREATE TABLE IF NOT EXISTS qr_code_activity (
    user_id INTEGER,
    qr_type TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`;

export const seedPlansAndFeaturesQuery = `
  INSERT INTO subscription_plans (name, price) VALUES
    ('Free', '0'),
    ('Basic', '₹1250/month'),
    ('Standard', '₹5000/6 months'),
    ('Premium', '₹10000/year');

  INSERT INTO features (name) VALUES
    ('Basic QR Code'),
    ('Image QR Code'),
    ('Dynamic QR Code'),
    ('Bulk QR Code'),
    ('Invitation QR Code');

  INSERT INTO plan_features (plan_id, feature_id) VALUES
    (1, 1), -- Free plan: Basic QR Code
    (1, 2), -- Free plan: Image QR Code
    (2, 3), -- Basic plan: Dynamic QR Code
    (2, 4), -- Basic plan: Bulk QR Code
    (4, 5); -- Premium plan: Invitation QR Code
`;
