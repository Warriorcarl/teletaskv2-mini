import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    
    const { logType, userId, taskId, details } = req.body;

    // Simpan log aktivitas ke koleksi 'logs'
    const result = await db.collection('logs').insertOne({
      logType,
      userId,
      taskId,
      details,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Log activity saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
