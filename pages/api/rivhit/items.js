import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { item_group_id } = req.query;
    const api = new RivhitAPI();
    const items = await api.getItems(item_group_id);

    res.status(200).json({
      success: true,
      data: items,
      total: items.length
    });
  } catch (error) {
    console.error('API /api/rivhit/items error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch items',
      message: error.message
    });
  }
}
