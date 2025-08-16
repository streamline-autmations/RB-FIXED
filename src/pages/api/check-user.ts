import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE_ID as string);
const table = base(process.env.AIRTABLE_TABLE_ID as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const records = await table
      .select({ filterByFormula: `{Email Address} = "${email}"`, maxRecords: 1 })
      .firstPage();

    if (records.length > 0) {
      const user = records[0];
      res.status(200).json({
        exists: true,
        recordId: user.id,
        status: user.fields['Entry Status'],
        logosFound: user.fields['Logo Count'] || 0,
      });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking user' });
  }
}
