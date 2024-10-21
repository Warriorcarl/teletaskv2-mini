import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const message = req.body.message;  // Pesan yang diterima dari webhook Telegram

  if (message.forward_from_chat) {
    const { db } = await connectToDatabase();

    const forwardData = {
      originalMessageId: message.forward_from_message_id,
      forwardFromChannel: message.forward_from_chat.title,
      forwardSignature: message.forward_signature || null,
      forwardDate: new Date(message.forward_date * 1000),
      originalText: message.text,
    };

    // Simpan data ke MongoDB (collection 'forwardedMessages')
    await db.collection('forwardedMessages').insertOne(forwardData);

    res.status(200).json({ message: 'Forwarded message saved successfully' });
  } else {
    res.status(400).json({ message: 'Message is not a forward' });
  }
}
