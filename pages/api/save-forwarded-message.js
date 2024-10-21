import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { originalMessageId, forwardFromChannel, forwardSignature, forwardDate, originalText } = req.body;

  // Simpan metadata ke MongoDB
  const result = await db.collection('forwardedMessages').insertOne({
    originalMessageId,
    forwardFromChannel,
    forwardSignature,
    forwardDate,
    originalText,
    createdAt: new Date(),
  });

  res.status(200).json({ message: 'Forwarded message saved successfully' });
}
