import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const data = await db.collection('test').find({}).toArray();
  res.status(200).json(data);
}