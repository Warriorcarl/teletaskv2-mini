import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    
    const { taskId, menu, userId } = req.body;

    // Pindahkan tugas ke menu yang ditentukan
    const result = await db.collection('tasks').updateOne(
      { _id: taskId },
      { $set: { menu } }
    );

    // Simpan log aktivitas ke koleksi 'logs'
    await db.collection('logs').insertOne({
      logType: 'taskMoved',
      userId,
      taskId,
      details: { menu },
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Task moved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
