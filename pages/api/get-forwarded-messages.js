import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const messages = await db.collection('forwardedMessages').find({}).toArray();
  res.status(200).json(messages);
}
