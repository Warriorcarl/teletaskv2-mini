import mongoose from 'mongoose';

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
  await mongoose.connect(process.env.MONGODB_URI);

  const { queryId, settings } = req.body;

  const user = await User.findOne({ queryId });

  if (user) {
    user.settings = settings;
    await user.save();
  } else {
    const newUser = new User({ queryId, settings });
    await newUser.save();
  }

  res.status(200).json({ message: 'Settings saved' });
}
