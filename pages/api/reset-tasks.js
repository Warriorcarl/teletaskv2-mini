import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();

    const result = await db.collection('tasks').updateMany(
      { completed: true },
      { $set: { completed: false } }
    );

    res.status(200).json({ message: 'Tasks reset successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
