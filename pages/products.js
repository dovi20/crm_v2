import DashboardLayout from '../components/DashboardLayout';
import { useState, useEffect } from 'react';

function ProductCard({ product, theme, onClick, isMobile }) {
  const fullName = `${product.item_name || ''}`.trim() || 'לא צוין';
  const price = product.sale_nis ? `₪${product.sale_nis}` : 'לא צוין';

  return (
    <div
      style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.border}`,
        borderRadius: '8px',
        padding: isMobile ? '14px' : '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        minHeight: isMobile ? '140px' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      onClick={onClick}
      onMouseEnter={!isMobile ? (e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = `0 4px 12px ${theme.shadow || 'rgba(0,0,0,0.15)'}`;
      } : undefined}
      onMouseLeave={!isMobile ? (e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      } : undefined}
    >
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{
          color: theme.textPrimary,
          margin: '0 0 4px 0',
          fontSize: isMobile ? '15px' : '16px',
          fontWeight: '600'
        }}>
          {fullName}
        </h4>
        <span style={{
          color: '#6200ea',
          fontSize: isMobile ? '11px' : '12px',
          fontWeight: '500'
        }}>
          קטלוג: {product.item_part_num || product.barcode || 'לא צוין'}
        </span>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{
          display: 'block',
          marginBottom: '4px',
          color: theme.textSecondary,
          fontSize: isMobile ? '11px' : '12px'
        }}>
          💰 {price}
        </span>
        <span style={{
          display: 'block',
          marginBottom: '4px',
          color: theme.textSecondary,
          fontSize: isMobile ? '11px' : '12px'
        }}>
          📦 {product.quantity || 0} יחידות
        </span>
        <span style={{
          display: 'block',
          color: theme.textSecondary,
          fontSize: isMobile ? '11px' : '12px'
        }}>
          🏢 מחסן {product.storage_id || 'ראשי'}
        </span>
      </div>
    </div>
  );
}

export default function Products() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addProductForm, setAddProductForm] = useState({
    item_name: '',
    item_part_num: '',
    cost_nis: '',
    sale_nis: '',
    quantity: ''
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  const theme = {
    textPrimary: darkMode ? '#ffffff' : '#000000',
    textSecondary: darkMode ? '#b0b0b0' : '#666666',
    cardBackground: darkMode ? '#2a2a2a' : '#f9f9f9',
    border: darkMode ? '#333' : '#e0e0e0',
    headerBg: darkMode ? '#1e1e1e' : '#f5f5f5',
    buttonPrimary: darkMode ? '#bb86fc' : '#6200ea',
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (modalOpen && selectedProduct) {
      fetchProductDetails();
    }
  }, [modalOpen, selectedProduct]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProductDetails = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/rivhit/item-details?itemId=${selectedProduct.item_id}`);
      const result = await response.json();

      if (result.success) {
        setProductDetails(result.data);
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rivhit/items');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch products');
      }

      setProducts(result.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sort and filter products
  const sortedAndFilteredProducts = products
    .filter(product => {
      if (!searchTerm) return true;
      const name = (product.item_name || '').toLowerCase();
      const partNum = (product.item_part_num || '').toLowerCase();
      const barcode = (product.barcode || '').toLowerCase();
      const search = searchTerm.toLowerCase();
      return name.includes(search) || partNum.includes(search) || barcode.includes(search);
    })
    .sort((a, b) => {
      const nameA = (a.item_name || '').toLowerCase();
      const nameB = (b.item_name || '').toLowerCase();
      return nameA.localeCompare(nameB, 'he');
    });

  const handleAddProduct = async () => {
    if (!addProductForm.item_name) {
      alert('אנא הכנס שם המוצר');
      return;
    }

    try {
      // Here we would call Rivhit API to add product
      // For now, just show success message and refresh
      setAddProductForm({ item_name: '', item_part_num: '', cost_nis: '', sale_nis: '', quantity: '' });
      setShowAddProduct(false);
      alert('המוצר נוסף בהצלחה! (API integration pending)');
      // Refresh products list
      fetchProducts();
    } catch (error) {
      alert('שגיאה בהוספת המוצר: ' + error.message);
    }
  };

  return (
    <DashboardLayout currentTab="products">
      {(currentDarkMode, toggleDarkMode) => {
        setDarkMode(currentDarkMode);
        return (
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{ color: theme.textPrimary, margin: 0 }}>מוצרים ומלאי</h2>
                <button
                  onClick={fetchProducts}
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

              {/* Search and Add Toolbar */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  background: theme.cardBackground,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  padding: '8px 12px',
                  flex: 1,
                  minWidth: '200px'
                }}>
                  <span style={{ color: theme.textSecondary, fontSize: '16px' }}>🔍</span>
                  <input
                    type="text"
                    placeholder="חפש לפי שם מוצר, קטלוג או ברקוד..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      color: theme.textPrimary,
                      fontSize: '14px',
                      width: '100%'
                    }}
                  />
                </div>
                <button
                  onClick={() => setShowAddProduct(true)}
                  style={{
                    background: theme.buttonPrimary,
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>+</span>
                  מוצר חדש
                </button>
              </div>
            </div>

            {loading && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: theme.textSecondary
              }}>
                טוען מוצרים...
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
                  onClick={fetchProducts}
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

            {!loading && !error && products.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: theme.textSecondary,
                backgroundColor: theme.cardBackground,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📦</div>
                <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>אין מוצרים</h3>
                <p>לא נמצאו מוצרים במערכת</p>
              </div>
            )}

            {!loading && !error && sortedAndFilteredProducts.length > 0 && (
              <div>
                <div style={{
                  padding: '15px 20px',
                  backgroundColor: theme.headerBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px 12px 0 0',
                  fontWeight: '600',
                  color: theme.textPrimary
                }}>
                  נמצאו {sortedAndFilteredProducts.length} מתוך {products.length} מוצרים
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: isMobile ? '12px' : '15px',
                  padding: isMobile ? '15px' : '20px',
                  backgroundColor: theme.cardBackground,
                  border: `1px solid ${theme.border}`,
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px'
                }}>
                  {sortedAndFilteredProducts.map(product => (
                    <ProductCard
                      key={product.item_id}
                      product={product}
                      theme={theme}
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalOpen(true);
                      }}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>
            )}

            {!loading && !error && products.length > 0 && searchTerm && sortedAndFilteredProducts.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: theme.textSecondary,
                backgroundColor: theme.cardBackground,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                <h3 style={{ color: theme.textPrimary, margin: '0 0 10px 0' }}>לא נמצאו תוצאות</h3>
                <p>נסה מונח חיפוש אחר או נקה את החיפוש</p>
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: theme.buttonPrimary,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  נקה חיפוש
                </button>
              </div>
            )}

            {/* Product Details Modal */}
            {modalOpen && selectedProduct && (
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
                  maxWidth: '700px',
                  maxHeight: '80vh',
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
                        {selectedProduct.item_name || 'פרטי מוצר'}
                      </h2>
                      <span style={{ color: theme.textSecondary }}>
                        {selectedProduct.item_part_num && `קטלוג: ${selectedProduct.item_part_num}`}
                        {selectedProduct.barcode && ` | ברקוד: ${selectedProduct.barcode}`}
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

                  {/* Content */}
                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px 24px'
                  }}>
                    {productDetails ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                      }}>
                        <div style={{
                          backgroundColor: theme.headerBg,
                          padding: '16px',
                          borderRadius: '8px',
                          border: `1px solid ${theme.border}`
                        }}>
                          <h4 style={{ margin: '0 0 12px 0', color: theme.textPrimary }}>פרטי מוצר</h4>
                          <div style={{ display: 'grid', gap: '8px' }}>
                            <div><strong>שם:</strong> {productDetails.item.item_name || 'לא צוין'}</div>
                            <div><strong>קטלוג:</strong> {productDetails.item.item_part_num || 'לא צוין'}</div>
                            <div><strong>ברקוד:</strong> {productDetails.item.barcode || 'לא צוין'}</div>
                            <div><strong>קבוצה:</strong> {productDetails.item.item_group_id}</div>
                          </div>
                        </div>

                        <div style={{
                          backgroundColor: theme.headerBg,
                          padding: '16px',
                          borderRadius: '8px',
                          border: `1px solid ${theme.border}`
                        }}>
                          <h4 style={{ margin: '0 0 12px 0', color: theme.textPrimary }}>מחירים ומלאי</h4>
                          <div style={{ display: 'grid', gap: '8px' }}>
                            <div><strong>מחיר עלות:</strong> ₪{productDetails.item.cost_nis || 'לא צוין'}</div>
                            <div><strong>מחיר מכירה:</strong> ₪{productDetails.item.sale_nis || 'לא צוין'}</div>
                            <div><strong>מלאי:</strong> {productDetails.balance.total} יחידות</div>
                            <div><strong>מחסן:</strong> {productDetails.item.storage_id}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', color: theme.textSecondary }}>
                        טוען פרטי מוצר...
                      </div>
                    )}
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
                      ערוך מוצר
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Product Modal */}
            {showAddProduct && (
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
                  maxWidth: '500px',
                  padding: '24px'
                }}>
                  <h2 style={{
                    margin: '0 0 20px 0',
                    color: theme.textPrimary,
                    fontSize: '24px'
                  }}>
                    הוספת מוצר חדש
                  </h2>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        color: theme.textPrimary,
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        שם המוצר *
                      </label>
                      <input
                        type="text"
                        value={addProductForm.item_name}
                        onChange={(e) => setAddProductForm(prev => ({ ...prev, item_name: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          backgroundColor: theme.headerBg,
                          color: theme.textPrimary,
                          fontSize: '14px'
                        }}
                        placeholder="הכנס שם המוצר"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        color: theme.textPrimary,
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        מספר קטלוג
                      </label>
                      <input
                        type="text"
                        value={addProductForm.item_part_num}
                        onChange={(e) => setAddProductForm(prev => ({ ...prev, item_part_num: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          backgroundColor: theme.headerBg,
                          color: theme.textPrimary,
                          fontSize: '14px'
                        }}
                        placeholder="מספר קטלוג או ט״מ"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        color: theme.textPrimary,
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        מחיר עלות
                      </label>
                      <input
                        type="number"
                        value={addProductForm.cost_nis}
                        onChange={(e) => setAddProductForm(prev => ({ ...prev, cost_nis: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          backgroundColor: theme.headerBg,
                          color: theme.textPrimary,
                          fontSize: '14px'
                        }}
                        placeholder="מחיר עלות בשקלים"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        color: theme.textPrimary,
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        מחיר מכירה
                      </label>
                      <input
                        type="number"
                        value={addProductForm.sale_nis}
                        onChange={(e) => setAddProductForm(prev => ({ ...prev, sale_nis: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          backgroundColor: theme.headerBg,
                          color: theme.textPrimary,
                          fontSize: '14px'
                        }}
                        placeholder="מחיר מכירה בשקלים"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        color: theme.textPrimary,
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        כמות במלאי
                      </label>
                      <input
                        type="number"
                        value={addProductForm.quantity}
                        onChange={(e) => setAddProductForm(prev => ({ ...prev, quantity: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          backgroundColor: theme.headerBg,
                          color: theme.textPrimary,
                          fontSize: '14px'
                        }}
                        placeholder="כמות ראשונית"
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    marginTop: '24px'
                  }}>
                    <button
                      onClick={() => setShowAddProduct(false)}
                      style={{
                        padding: '8px 16px',
                        border: `1px solid ${theme.border}`,
                        background: 'none',
                        color: theme.textPrimary,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ביטול
                    </button>
                    <button
                      onClick={handleAddProduct}
                      style={{
                        padding: '8px 16px',
                        background: theme.buttonPrimary,
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      הוסף מוצר
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
}
