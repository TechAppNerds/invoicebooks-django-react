import axios from "./index";

class ActionsApi {
  static ProfileSurvey = (user, data) => {
    // return axios.put(`auth/profile-survey/${data.user_id}`, data, { headers: { Authorization: `Token ${data.user_token}` } });
    return axios.put(`auth/profile-survey/${user.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static GetBusiness = (user) => {
    return axios.get(`auth/get-business-survey/${user.id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateBusiness = (user, data) => {
    return axios.post("auth/create-business-survey", data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateBusiness = (user, data) => {
    return axios.put(`auth/update-business-survey/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  // static CleanUpload = (user) => {
  //   return axios.delete(`auth/clean-upload/${user.id}`, { headers: { Authorization: `JWT ${user.token}` } });
  // };

  static UpdateAccount = (user, data) => {
    // return axios.put(`auth/users/me/`, data, { headers: { Authorization: `JWT ${user.token}` } });
    return axios.put(`auth/update-account/${user.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateBusiness = (user, data) => {
    return axios.put(`auth/update-business-survey/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateBusinessOfAccount = (user, data) => {
    return axios.put(`auth/update-business-account/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };
  
  static UpdateLogoThemeOfAccount = (user, data) => {
    return axios.put(`auth/update-logo-theme-account/${user.business_id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateEmailNotificationsOfAccount = (user, data) => {
    // return axios.put(`auth/users-notification/${data.id}`, { headers: { Authorization: `JWT ${user.token}` }});
    return axios.put(`auth/update-email-notifications-account/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static GetBusinessItems = (user, data) => {
    return axios.get(`auth/business-items/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateBusinessItems = (user, data) => {
    return axios.post(`auth/business-items`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateBusinessItems = (user, data) => {
    return axios.put(`auth/business-items/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteBusinessItems = (user) => {
    return axios.delete(`auth/business-items`, { headers: { Authorization: `JWT ${user.token}` }, data: { items: user.data } });
  };

  // static SetBusinessItemsSalesTaxes = (user, data) => {
  //   return axios.put(`auth/business-items-sales-tax/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  // };
  
  static GetBusinessServices = (user, data) => {
    return axios.get(`auth/business-services/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateBusinessServices = (user, data) => {
    return axios.post(`auth/business-services`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateBusinessServices = (user, data) => {
    return axios.put(`auth/business-services/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteBusinessServices = (user) => {
    return axios.delete(`auth/business-services`, { headers: { Authorization: `JWT ${user.token}` }, data: { services: user.data } });
  };

  // static SetBusinessServicesSalesTaxes = (user, data) => {
  //   return axios.put(`auth/business-services-sales-tax/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  // };

  static GetBusinessSalesTax = (user, data) => {
    return axios.get(`auth/business-sales-tax/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateBusinessSalesTax = (user, data) => {
    return axios.post(`auth/business-sales-tax`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateBusinessSalesTax = (user, data) => {
    return axios.put(`auth/business-sales-tax/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteBusinessSalesTax = (user) => {
    return axios.delete(`auth/business-sales-tax`, { headers: { Authorization: `JWT ${user.token}` }, data: { sales_taxes: user.data } });
  };

  static GetClients = (user, data) => {
    return axios.get(`auth/clients/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateClients = (user, data) => {
    return axios.post(`auth/clients`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateClients = (user, data) => {
    return axios.put(`auth/clients/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteClients = (user) => {
    return axios.delete(`auth/clients`, { headers: { Authorization: `JWT ${user.token}` }, data: { clients: user.data } });
  };

  static GetContacts = (user, data) => {
    return axios.get(`auth/contacts/${data.client_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateContacts = (user, data) => {
    return axios.post(`auth/contacts`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateContacts = (user, data) => {
    return axios.put(`auth/contacts/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteContacts = (user) => {
    return axios.delete(`auth/contacts`, { headers: { Authorization: `JWT ${user.token}` }, data: { contacts: user.data } });
  };

  static GetInvoices = (user, data) => {
    // return axios.get(`auth/invoices/${data.billed_to}`, { headers: { Authorization: `JWT ${user.token}` } });
    // return axios.get(`auth/invoices/${data.client_id}`, { headers: { Authorization: `JWT ${user.token}` } });
    return axios.get(`auth/invoices/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateInvoices = (user, data) => {
    return axios.post(`auth/invoices`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateInvoices = (user, data) => {
    // return axios.put(`auth/invoices/${data.get("id")}`, data, { headers: { Authorization: `JWT ${user.token}` } });
    return axios.put(`auth/invoices/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteInvoices = (user) => {
    return axios.delete(`auth/invoices`, { headers: { Authorization: `JWT ${user.token}` }, data: { invoices: user.data } });
  };

  // static GetInvoiceLineItems = (user, data) => {
  //   return axios.get(`auth/invoice-line-items/${data.invoice_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  // };

  // // static CreateInvoiceLineItems = (user, data) => {
  // static SetInvoiceLineItems = (user, data) => {
  //   // return axios.post(`auth/invoice-line-items`, data, { headers: { Authorization: `JWT ${user.token}` } });
  //   // return axios.put(`auth/invoice-line-items/${data.invoice_id}`, data.invoice_line_items, { headers: { Authorization: `JWT ${user.token}` } });
  //   return axios.put(`auth/invoice-line-items`, data, { headers: { Authorization: `JWT ${user.token}` } });
  // };

  // static UpdateInvoiceLineItems = (user, data) => {
  //   return axios.put(`auth/invoice-line-items/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  // };

  // static DeleteInvoiceLineItems = (user) => {
  //   return axios.delete(`auth/invoice-line-items`, { headers: { Authorization: `JWT ${user.token}` }, data: { invoice_line_items: user.data } });
  // };

  static GetVendors = (user, data) => {
    return axios.get(`auth/vendors/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static CreateVendors = (user, data) => {
    return axios.post(`auth/vendors`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static UpdateVendors = (user, data) => {
    return axios.put(`auth/vendors/${data.id}`, data, { headers: { Authorization: `JWT ${user.token}` } });
  };

  static DeleteVendors = (user) => {
    return axios.delete(`auth/vendors`, { headers: { Authorization: `JWT ${user.token}` }, data: { vendors: user.data } });
  };
}

// let base = "users";

export default ActionsApi;
