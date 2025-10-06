import DashboardLayout from '../components/DashboardLayout';
import { useState, useEffect } from 'react';

function CustomerCard({ customer, theme, onClick }) {
  const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'לא צוין';
  const address = [customer.street, customer.city].filter(Boolean).join(', ') || 'לא צוין';

  return (
    <div
      style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        borderRadius: '8px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': { boxShadow: `0 4px 12px ${theme.shadow}` }
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = `0 4px 12px ${theme.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{
          color: theme.textPrimary,
          margin: '0 0 4px 0',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          {fullName}
        </h4>
        <span style={{
          color: '#6200ea',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          ID: {customer.customer_id}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px', marginLeft: '8px', color: theme.textSecondary }}>📧</span>
        <span style={{ color: theme.textSecondary, fontSize: '14px', direction: 'ltr' }}>
          {customer.email || 'לא צוין'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px', marginLeft: '8px', color: theme.textSecondary }}>📱</span>
        <span style={{ color: theme.textSecondary, fontSize: '14px', direction: 'ltr' }}>
          {customer.phone || 'לא צוין'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '16px', marginLeft: '8px', color: theme.textSecondary }}>📍</span>
        <span style={{ color: theme.textSecondary, fontSize: '14px' }}>
          {address}
        </span>
      </div>
    </div>
  );
}

export default function Customers() {
  const [darkMode, setDarkMode] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerDocuments, setCustomerDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  const theme = {
    textPrimary: darkMode ? '#ffffff' : '#000000',
    textSecondary: darkMode ? '#b0b0b0' : '#666666',
    cardBackground: darkMode ? '#2a2a2a' : '#f9f9f9',
    border: darkMode ? '#333' : '#e0e0e0',
    headerBg: darkMode ? '#1e1e1e' : '#f5f5f5',
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (modalOpen && selectedCustomer) {
      fetchCustomerDetails();
      setActiveTab('details');
    }
  }, [modalOpen, selectedCustomer]);

  const fetchCustomerDetails = async () => {
    if (!selectedCustomer) return;

    try {
      const [detailsResponse, documentsResponse] = await Promise.all([
        fetch(`/api/rivhit/customer-details?customerId=${selectedCustomer.customer_id}`),
        fetch(`/api/rivhit/customer-documents?customerId=${selectedCustomer.customer_id}&limit=20`)
      ]);

      const detailsResult = await detailsResponse.json();
      const documentsResult = await documentsResponse.json();

      if (detailsResult.success) {
        setCustomerDetails(detailsResult.data);
      }

      if (documentsResult.success) {
        setCustomerDocuments(documentsResult.data);
      }
    } catch (err) {
      console.error('Error fetching customer details:', err);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rivhit/customers');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch customers');
      }

      setCustomers(result.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDarkModeToggle = (newDarkMode) => {
    setDarkMode(newDarkMode);
  };

  return (
    <DashboardLayout currentTab="customers">
      {(currentDarkMode, toggleDarkMode) => {
        setDarkMode(currentDarkMode);
        return (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ color: theme.textPrimary, margin: 0 }}>לקוחות</h2>
              <button
                onClick={fetchCustomers}
                style={{
                  background: theme.cardBackground,
                  border: `1px solid ${theme.border}`,
                  color: theme.textPrimary,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                רענן
              </button>
            </div>

            {loading && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: theme.textSecondary
              }}>
                טוען לקוחות...
              </div>
            )}

            {error && (
              <div style={{
                backgroundColor: '#ffecf0',
                border: '1px solid #ffccd5',
                color: '#dc3545',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '20px'
              }}>
                שגיאה בטעינת נתונים: {error}
                <button
                  onClick={fetchCustomers}
                  style={{
                    marginLeft: '10px',
                    background: 'none',
                    border: '1px solid #dc3545',
                    color: '#dc3545',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  נסה שוב
                </button>
              </div>
            )}

            {!loading && !error && customers.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: theme.textSecondary,
                backgroundColor: theme.cardBackground,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
                <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>אין לקוחות</h3>
                <p>לא נמצאו לקוחות במערכת</p>
              </div>
            )}

            {!loading && !error && customers.length > 0 && (
              <div>
                <div style={{
                  padding: '15px 20px',
                  backgroundColor: theme.headerBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px 12px 0 0',
                  fontWeight: '600',
                  color: theme.textPrimary
                }}>
                  נמצאו {customers.length} לקוחות
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '15px',
                  padding: '20px',
                  backgroundColor: theme.cardBackground,
                  border: `1px solid ${theme.border}`,
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px'
                }}>
                  {customers.map(customer => (
                    <CustomerCard
                      key={customer.customer_id}
                      customer={customer}
                      theme={theme}
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Customer Details Modal */}
            {modalOpen && selectedCustomer && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
              }}>
                <div style={{
                  backgroundColor: theme.cardBackground,
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '1000px',
                  maxHeight: '90vh',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Header */}
                  <div style={{
                    padding: '20px 24px',
                    borderBottom: `1px solid ${theme.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h2 style={{ margin: 0, color: theme.textPrimary }}>
                        {`${selectedCustomer.first_name || ''} ${selectedCustomer.last_name || ''}`.trim() || 'פרטי לקוח'}
                      </h2>
                      <span style={{ color: theme.textSecondary }}>
                        ID: {selectedCustomer.customer_id}
                      </span>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: theme.textSecondary,
                        padding: '4px'
                      }}
                    >
                      ×
                    </button>
                  </div>

                  {/* Tabs */}
                  <div style={{
                    display: 'flex',
                    borderBottom: `1px solid ${theme.border}`,
                    backgroundColor: theme.headerBg
                  }}>
                    {[
                      { key: 'details', label: 'פרטים אישיים', icon: '👤' },
                      { key: 'documents', label: 'מסמכים', icon: '📄' },
                      { key: 'balance', label: 'יתרה וחובות', icon: '💰' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          flex: 1,
                          padding: '12px 20px',
                          border: 'none',
                          background: activeTab === tab.key ? theme.cardBackground : 'transparent',
                          color: theme.textPrimary,
                          cursor: 'pointer',
                          fontWeight: activeTab === tab.key ? '600' : '400',
                          transition: 'all 0.2s',
                          borderBottom: activeTab === tab.key ? '2px solid #6200ea' : 'none'
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px 24px'
                  }}>
                    {activeTab === 'details' && renderDetailsTab()}
                    {activeTab === 'documents' && renderDocumentsTab()}
                    {activeTab === 'balance' && renderBalanceTab()}
                  </div>

                  {/* Footer */}
                  <div style={{
                    padding: '16px 24px',
                    borderTop: `1px solid ${theme.border}`,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => setModalOpen(false)}
                      style={{
                        padding: '8px 16px',
                        border: `1px solid ${theme.border}`,
                        background: 'none',
                        color: theme.textPrimary,
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      סגור
                    </button>
                    <button
                      style={{
                        padding: '8px 16px',
                        background: '#6200ea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      ערוך פרטים
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </DashboardLayout>
  );

  function renderDetailsTab() {
    if (!customerDetails) {
      return <div style={{ textAlign: 'center', color: theme.textSecondary }}>טוען פרטים...</div>;
    }

    const customer = customerDetails.customer;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          backgroundColor: theme.headerBg,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: theme.textPrimary }}>פרטים אישיים</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div><strong>שם פרטי:</strong> {customer.first_name || 'לא צוין'}</div>
            <div><strong>שם משפחה:</strong> {customer.last_name || 'לא צוין'}</div>
            <div><strong>ת.ז:</strong> {customer.id_number || 'לא צוין'}</div>
            <div><strong>עוסק מורשה:</strong> {customer.vat_number || 'לא צוין'}</div>
          </div>
        </div>

        <div style={{
          backgroundColor: theme.headerBg,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: theme.textPrimary }}>קשר</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div><strong>טלפון:</strong> <span dir="ltr">{customer.phone || 'לא צוין'}</span></div>
            <div><strong>פקס:</strong> <span dir="ltr">{customer.fax || 'לא צוין'}</span></div>
            <div><strong>מייל:</strong> <span dir="ltr">{customer.email || 'לא צוין'}</span></div>
          </div>
        </div>

        <div style={{
          backgroundColor: theme.headerBg,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: theme.textPrimary }}>כתובת</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div><strong>רחוב:</strong> {customer.street || 'לא צוין'}</div>
            <div><strong>עיר:</strong> {customer.city || 'לא צוין'}</div>
            <div><strong>מיקוד:</strong> {customer.zipcode || 'לא צוין'}</div>
          </div>
        </div>

        <div style={{
          backgroundColor: theme.headerBg,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: theme.textPrimary }}>הגדרות עסק</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div><strong>סוג לקוח:</strong> {customer.customer_type}</div>
            <div><strong>מחירון:</strong> {customer.price_list_id}</div>
            <div><strong>סוכן:</strong> {customer.agent_id}</div>
            <div><strong>הנחה:</strong> {customer.discount_percent}%</div>
            <div><strong>הערות:</strong> {customer.comments || 'אין'}</div>
          </div>
        </div>
      </div>
    );
  }

  function renderDocumentsTab() {
    return (
      <div>
        <h4 style={{ margin: '0 0 16px 0', color: theme.textPrimary }}>
          מסמכים ({customerDocuments.length})
        </h4>

        {customerDocuments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: theme.textSecondary,
            backgroundColor: theme.headerBg,
            borderRadius: '8px'
          }}>
            אין מסמכים
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '12px',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {customerDocuments.map(doc => (
              <div key={doc.document_number} style={{
                padding: '12px',
                backgroundColor: theme.headerBg,
                borderRadius: '6px',
                border: `1px solid ${theme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: theme.textPrimary }}>
                    {doc.document_name || `מסמך מספר ${doc.document_number}`}
                  </div>
                  <div style={{ fontSize: '12px', color: theme.textSecondary }}>
                    תאריך: {doc.document_date} | סכום: ₪{doc.amount?.toLocaleString()}
                  </div>
                </div>
                <button style={{
                  background: '#6200ea',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  הורד
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderBalanceTab() {
    const balance = customerDetails?.balance || 0;

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '24px',
          backgroundColor: balance >= 0 ? '#e8f5e8' : '#ffeaea',
          borderRadius: '8px',
          border: balance >= 0 ? '1px solid #4caf50' : '1px solid #f44336'
        }}>
          <div style={{
            fontSize: '36px',
            marginBottom: '8px',
            color: balance >= 0 ? '#4caf50' : '#f44336'
          }}>
            {balance >= 0 ? '💚' : '💔'}
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '600',
            color: balance >= 0 ? '#4caf50' : '#f44336',
            marginBottom: '8px'
          }}>
            ₪{Math.abs(balance).toLocaleString()}
          </div>
          <div style={{ color: balance >= 0 ? '#4caf50' : '#f44336' }}>
            {balance >= 0 ? 'יתרה חיובית' : 'יתרה שלילית'}
          </div>
        </div>

        <div style={{
          padding: '24px',
          backgroundColor: theme.headerBg,
          borderRadius: '8px',
          border: `1px solid ${theme.border}`
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: theme.textPrimary }}>
            מידע חשבוני
          </h4>
          <div style={{ display: 'grid', gap: '8px', color: theme.textPrimary }}>
            <div><strong>תנאי תשלום:</strong> {customerDetails?.customer?.credit_terms || 'לא צוין'}</div>
            <div><strong>ימי אשראי:</strong> {customerDetails?.customer?.credit_days || 'לא צוין'}</div>
            <div><strong>תאריך פרעון:</strong> {customerDetails?.customer?.due_date || 'לא צוין'}</div>
          </div>
        </div>
      </div>
    );
  }
}
