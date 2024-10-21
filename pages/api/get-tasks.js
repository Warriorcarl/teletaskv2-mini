import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const tasks = await db.collection('tasks').find({}).toArray();

  res.status(200).json({ tasks });
}