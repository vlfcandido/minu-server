import { Router } from 'express';
import { dbClient } from '../../common/dbClient';
import { MessageRecord } from '../../common/types';

const router = Router();

/**
 * GET /brazer/messages
 * Query Params:
 *  - since: ISO date
 *  - unconsumed: 'true' for unconsumed only
 */
router.get('/messages', async (req, res) => {
  const since = req.query.since ? new Date(req.query.since as string) : new Date(0);
  const rows = await dbClient.getMessagesSince(since);
  res.json(rows);
});


/**
 * POST /brazer/messages/:id/status
 */
router.post('/messages/:id/status', async (req, res) => {
  await dbClient.updateMessageStatus(Number(req.params.id), req.body.status);
  res.sendStatus(204);
});

/**
 * POST /brazer/messages/:id/consume
 */
router.post('/messages/:id/consume', async (req, res) => {
  await dbClient.markConsumed(Number(req.params.id));
  res.sendStatus(204);
});

export default router;
