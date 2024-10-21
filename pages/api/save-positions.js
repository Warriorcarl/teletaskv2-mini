import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/mongodb';

const UserSchema = new mongoose.Schema({
  queryId: String,
  positions: Object,
});

let User;

try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', UserSchema);
}

export default async function handler(req, res) {
  await connectToDatabase();

  const { queryId, positions } = req.body;

  try {
    let user = await User.findOne({ queryId });
    if (user) {
      user.positions = positions;
      await user.save();
    } else {
      const newUser = new User({ queryId, positions });
      await newUser.save();
    }

    res.status(200).json({ message: 'Menu positions saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save menu positions', error });
  }
}