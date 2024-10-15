//** Subscription Plans API Endpoint (CQRS Pattern):**

// app/api/subscription/plans.js
import { openDb } from '../utility/database';
import { getSession } from 'next-auth/react';
import { getUserSubscriptionQuery, getSubscriptionPlanQuery, getPlanFeaturesQuery } from '../queries/userQueries';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { handleError, handleHttpError } from '../utility/errorHandler';

export async function queryUserSubscription(userId) {
  try {
    const db = await openDb();
    const userSubscription = await db.get(getUserSubscriptionQuery, userId);
    if (!userSubscription) {
      return null;
    }

    const plan = await db.get(getSubscriptionPlanQuery, userSubscription.plan_id);
    const features = await db.all(getPlanFeaturesQuery, plan.id);

    return { ...plan, features: features.map((f) => f.name) };
  } catch (error) {
    handleError(error, ERROR_MESSAGES.DATABASE_ERROR);
  }
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    handleHttpError(res, 401, ERROR_MESSAGES.UNAUTHORIZED);
    return;
  }

  if (req.method === 'GET') {
    try {
      const subscriptionData = await queryUserSubscription(session.user.id);
      if (!subscriptionData) {
        handleHttpError(res, 403, ERROR_MESSAGES.NO_SUBSCRIPTION);
        return;
      }

      res.status(200).json(subscriptionData);
    } catch (error) {
      handleHttpError(res, 500, ERROR_MESSAGES.DATABASE_ERROR);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(ERROR_MESSAGES.METHOD_NOT_ALLOWED(req.method));
  }
}