import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const api = new RivhitAPI();
    const customers = await api.getCustomers();

    res.status(200).json({
      success: true,
      count: customers.length,
      latest: customers.slice(0, 5) // For potential use in dashboard
    });
  } catch (error) {
    console.error('API /api/stats/customers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customer stats',
      message: error.message
    });
  }
}
