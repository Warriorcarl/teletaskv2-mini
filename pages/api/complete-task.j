import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { taskId } = req.body;
    const { db } = await connectToDatabase();

    const result = await db.collection('tasks').updateOne(
      { id: taskId },
      { $set: { completed: true } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Task marked as completed' });
    } else {
      res.status(400).json({ message: 'Failed to mark task as completed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
