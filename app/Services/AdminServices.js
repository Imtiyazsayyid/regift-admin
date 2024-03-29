import Api from "./Api";

export async function login(payload) {
  return await Api().post("auth/login", payload);
}

export async function getAccessToken(refreshToken) {
  return await Api().post(`auth/access-token`, {
    refreshToken,
  });
}

// Admin

export async function getAdminDetails() {
  return await Api().get("/details");
}

// Donor
export async function getAllDonors(params) {
  return await Api().get("/donors", { params });
}

export async function getSingleDonor(id) {
  return await Api().get(`/donor/${id}`);
}

export async function saveDonor(payload) {
  return await Api().post("/donors", payload);
}

export async function deleteDonor(id) {
  return await Api().delete(`/donor/${id}`);
}

//Organisation
export async function getAllOrganisations(params) {
  return await Api().get("/organisations", { params });
}

export async function getSingleOrganisation(id) {
  return await Api().get(`/organisation/${id}`);
}

export async function saveOrganisation(payload) {
  return await Api().post("/organisations", payload);
}

export async function deleteOrganisation(id) {
  return await Api().delete(`/organisation/${id}`);
}

// Category
export async function getAllCategories(params) {
  return await Api().get("/categories", { params });
}

export async function getSingleCategory(id) {
  return await Api().get(`/category/${id}`);
}

export async function saveCategory(payload) {
  return await Api().post("/categories", payload);
}

export async function deleteCategory(id) {
  return await Api().delete(`/category/${id}`);
}

// Donated Item
export async function getAllDonatedItems(params) {
  return await Api().get("/donated-items", { params });
}

export async function saveDonatedItem(payload) {
  return await Api().post("/donated-items", payload);
}

export async function getSingleDonatedItem(id) {
  return await Api().get(`/donated-item/${id}`);
}

export async function deleteDonatedItem(id) {
  return await Api().delete(`/donated-item/${id}`);
}

// Orders

export async function getAllOrders(params) {
  return await Api().get("/orders", { params });
}

export async function saveOrder(payload) {
  return await Api().post("/orders", payload);
}

export async function getSingleOrder(id) {
  return await Api().get(`/order/${id}`);
}

export async function deleteOrder(id) {
  return await Api().delete(`/order/${id}`);
}

// charts
export async function chartOrders(params) {
  return await Api().get("/chart-orders", { params });
}

export async function chartDonations(params) {
  return await Api().get("/chart-donations", { params });
}

export async function chartDonors(params) {
  return await Api().get("/chart-donors", { params });
}

export async function chartOrganisations(params) {
  return await Api().get("/chart-organisations", { params });
}

export async function chartCounts(params) {
  return await Api().get("/chart-counts", { params });
}

export async function chartOrdersByCategory(params) {
  return await Api().get("/chart-orders-by-category", { params });
}

export async function chartDonationsByCategory(params) {
  return await Api().get("/chart-donations-by-category", { params });
}
