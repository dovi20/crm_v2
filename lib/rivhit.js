/**
 * Rivhit Online API Client
 * Handles communication with Rivhit REST API for CRM integration
 */

const RIVHIT_BASE_URL = 'https://api.rivhit.co.il/online/RivhitOnlineAPI.svc';

// Demo credentials - In production, these should come from secure config
const DEMO_TOKEN = process.env.RIVHIT_API_TOKEN;
const DEMO_COMPANY_ID = 123;

class RivhitAPI {
  constructor(apiToken = DEMO_TOKEN) {
    this.apiToken = apiToken;
    this.baseURL = RIVHIT_BASE_URL;
  }

  /**
   * Generic API request handler
   */
  async makeRequest(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          api_token: this.apiToken,
          ...data
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error_code !== 0) {
        throw new Error(`API Error ${result.error_code}: ${result.client_message || result.debug_message}`);
      }

      return result.data;
    } catch (error) {
      console.error('Rivhit API request failed:', error);
      throw error;
    }
  }

  /**
   * Get customers list
   * @param {number} customerType - Optional: filter by customer type
   */
  async getCustomers(customerType = null) {
    const data = {};
    if (customerType !== null) {
      data.customer_type = customerType;
    }

    const result = await this.makeRequest('/Customer.List', data);
    return result.customer_list || [];
  }

  /**
   * Get customer by ID
   */
  async getCustomer(customerId) {
    const result = await this.makeRequest('/Customer.Get', {
      customer_id: customerId
    });

    return result;
  }

  /**
   * Get items list
   */
  async getItems(itemGroupId = null) {
    const data = {};
    if (itemGroupId !== null) {
      data.item_group_id = itemGroupId;
    }

    const result = await this.makeRequest('/Item.List', data);
    return result.item_list || [];
  }

  /**
   * Get currencies
   */
  async getCurrencies() {
    const result = await this.makeRequest('/Currency.List');
    return result.currency_list || [];
  }

  /**
   * Get item groups
   */
  async getItemGroups() {
    const result = await this.makeRequest('/Item.Groups');
    return result.item_group_list || [];
  }

  /**
   * Get storages
   */
  async getStorages() {
    const result = await this.makeRequest('/Item.StorageList');
    return result.storage_list || [];
  }
}

export default RivhitAPI;
