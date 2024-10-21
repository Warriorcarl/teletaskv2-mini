import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { taskId, menu } = req.body;

  const result = await db.collection('tasks').updateOne(
    { _id: taskId },
    { $set: { menu } }
  );

  res.status(200).json({ message: 'Task moved successfully', result });
}