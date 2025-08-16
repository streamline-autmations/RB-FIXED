import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE_ID as string);
const table = base(process.env.AIRTABLE_TABLE_ID as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { recordId, logosFound } = req.body;
  if (!recordId || logosFound === undefined) {
    return res.status(400).json({ message: 'Record ID and logosFound are required' });
  }

  try {
    const updatedRecords = await table.update([
      { id: recordId, fields: { 'Logo Count': logosFound } },
    ]);
    
    res.status(200).json({ success: true, updatedFields: updatedRecords[0].fields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating progress' });
  }
}
