import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerType } = req.query;

    const api = new RivhitAPI();
    const customers = await api.getCustomers(customerType ? parseInt(customerType) : null);

    res.status(200).json({
      success: true,
      data: customers,
      count: customers.length
    });
  } catch (error) {
    console.error('API /api/rivhit/customers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customers',
      message: error.message
    });
  }
}
