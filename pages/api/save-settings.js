import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/mongodb';

const UserSchema = new mongoose.Schema({
  queryId: String,
  settings: Object,
});

let User;

try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', UserSchema);
}

export default async function handler(req, res) {
  await connectToDatabase();

  const { queryId, settings } = req.body;

  try {
    let user = await User.findOne({ queryId });
    if (user) {
      user.settings = settings;
      await user.save();
    } else {
      const newUser = new User({ queryId, settings });
      await newUser.save();
    }

    res.status(200).json({ message: 'Settings saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save settings', error });
  }
}