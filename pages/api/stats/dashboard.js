import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const api = new RivhitAPI();

    // Get all items to calculate total stock
    const items = await api.getItems();
    const totalStock = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    // Get all documents (sales/invoices) for the last month to calculate orders and revenue
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const documentsResponse = await fetch('https://api.rivhit.co.il/online/RivhitOnlineAPI.svc/Document.List', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_token: api.apiToken,
        from_date: oneMonthAgo.toLocaleDateString('he-IL'),
        to_date: new Date().toLocaleDateString('he-IL'),
        // Filter for sales documents (document_type might be 1 for sales, adjust as needed)
        document_type: 1 // Assuming 1 is for sales invoices
      })
    });

    const documentsResult = await documentsResponse.json();

    if (documentsResult.error_code !== 0) {
      throw new Error(`API Error ${documentsResult.error_code}: ${documentsResult.client_message || documentsResult.debug_message}`);
    }

    const documents = documentsResult.data?.document_list || [];

    // Calculate total orders (number of sales documents)
    const totalOrders = documents.length;

    // Calculate total revenue (sum of document totals)
    const totalRevenue = documents.reduce((sum, doc) => sum + (doc.total_nis || 0), 0);

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
