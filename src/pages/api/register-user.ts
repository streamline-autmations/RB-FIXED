import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE_ID as string);
const table = base(process.env.AIRTABLE_TABLE_ID as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { fullName, email, phone, deviceId } = req.body;

  try {
    const createdRecords = await table.create([
      { fields: {
          'Full Name': fullName,
          'Email Address': email,
          'Phone Number': phone,
          'Device id': deviceId,
          'Entry Status': 'Incomplete',
          'Logo Count': 0,
      }},
    ]);
    
    res.status(200).json({ success: true, user: createdRecords[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
