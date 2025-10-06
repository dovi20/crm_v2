import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { itemId } = req.query;
    if (!itemId) {
      return res.status(400).json({ error: 'itemId is required' });
    }

    const api = new RivhitAPI();

    // Get item full details from list (limited data available)
    const allItems = await api.getItems();
    const itemDetails = allItems.find(item => item.item_id === parseInt(itemId));

    if (!itemDetails) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        item: itemDetails,
        storages: [], // Would need to call Item.StorageList for each storage
        balance: { total: itemDetails.quantity || 0 }
      }
    });
  } catch (error) {
    console.error('API /api/rivhit/item-details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch item details',
      message: error.message
    });
  }
}
