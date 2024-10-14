// app/api/queries/userQueries.js
export const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
export const getUserByEmailQuery = 'SELECT * FROM users WHERE email = ?';
export const getUserSubscriptionQuery = 'SELECT plan_id FROM user_subscriptions WHERE user_id = ?';
export const getSubscriptionPlanQuery = 'SELECT * FROM subscription_plans WHERE id = ?';
export const getPlanFeaturesQuery = `
  SELECT features.name
  FROM features
  INNER JOIN plan_features ON features.id = plan_features.feature_id
  WHERE plan_features.plan_id = ?
`;
