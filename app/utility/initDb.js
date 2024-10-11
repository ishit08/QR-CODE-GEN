//** Initialize Database and Seed Data:**

// app/api/utility/initDb.js
import { openDb } from './database.js';
import { createTablesQuery, seedPlansAndFeaturesQuery } from '../queries/tableQueries';
import { handleError } from './errorHandler';
import { ERROR_MESSAGES } from '../constants/errorMessages';

(async () => {
  try {
    const db = await openDb();
    await db.exec(createTablesQuery);
    await db.exec(seedPlansAndFeaturesQuery);
  } catch (error) {
    handleError(error, ERROR_MESSAGES.FAILED_INIT_DB);
  }
})();