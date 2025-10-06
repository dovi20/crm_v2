import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const api = new RivhitAPI();
    const groups = await api.getItemGroups();

    res.status(200).json({
      success: true,
      data: groups
    });
  } catch (error) {
    console.error('API /api/rivhit/item-groups error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch item groups',
      message: error.message
    });
  }
}
