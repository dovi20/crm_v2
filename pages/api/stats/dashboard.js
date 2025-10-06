import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const api = new RivhitAPI();

    // Get all items to calculate total stock
    const items = await api.getItems();
    console.log('Items from Rivhit:', items); // Debug log
    const totalStock = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    console.log('Total stock calculated:', totalStock); // Debug log

    // For now, let's use mock data for orders and revenue since we need to verify the API structure
    const totalOrders = 0; // Will be implemented after testing items
    const totalRevenue = 0; // Will be implemented after testing items

    res.status(200).json({
      success: true,
      data: {
        totalProducts: totalStock,
        totalOrders: totalOrders,
        revenue: totalRevenue
      }
    });
  } catch (error) {
    console.error('API /api/stats/dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard stats',
      message: error.message
    });
  }
}
