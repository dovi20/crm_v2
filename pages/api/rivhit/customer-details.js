import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerId } = req.query;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID required' });
  }

  try {
    const api = new RivhitAPI();

    // Get customer details
    const customers = await api.getCustomers();
    const customer = customers.find(c => c.customer_id === parseInt(customerId));

    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    // Get customer balance
    let balance = null;
    try {
      const balanceResponse = await fetch(`https://api.rivhit.co.il/online/RivhitOnlineAPI.svc/Customer.Balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_token: api.apiToken,
          customer_id: parseInt(customerId)
        })
      });
      const balanceResult = await balanceResponse.json();
      balance = balanceResult.data?.balance || null;
    } catch (e) {
      console.warn('Could not fetch customer balance:', e.message);
    }

    res.status(200).json({
      success: true,
      data: { customer, balance }
    });
  } catch (error) {
    console.error('API /api/rivhit/customer-details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customer details',
      message: error.message
    });
  }
}
