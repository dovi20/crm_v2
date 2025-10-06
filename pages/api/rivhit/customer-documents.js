import RivhitAPI from '../../../lib/rivhit';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerId, limit = 50 } = req.query;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID required' });
  }

  try {
    const api = new RivhitAPI();

    // Get customer documents - using Document.List with customer filter
    const response = await fetch('https://api.rivhit.co.il/online/RivhitOnlineAPI.svc/Document.List', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_token: api.apiToken,
        from_customer_id: parseInt(customerId),
        to_customer_id: parseInt(customerId),
        // Recent 6 months by default
        from_date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL'),
        to_date: new Date().toLocaleDateString('he-IL')
      })
    });

    const result = await response.json();

    if (result.error_code !== 0) {
      throw new Error(`API Error ${result.error_code}: ${result.client_message || result.debug_message}`);
    }

    const documents = result.data?.document_list || [];
    // Limit if needed
    const limitedDocs = documents.slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: limitedDocs,
      count: limitedDocs.length,
      total: documents.length
    });
  } catch (error) {
    console.error('API /api/rivhit/customer-documents error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customer documents',
      message: error.message
    });
  }
}
