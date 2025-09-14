import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchAccounts = async () => {
  const response = await api.get("/accounts");
  return response.data;
};

export const fetchAccount = async (id) => {
  const response = await api.get(`/accounts/${id}`);
  return response.data;
};

export const triggerScan = async () => {
  await api.post("/scan/trigger");
};

export const fetchScanSummary = async () => {
  const response = await api.get("/scan/summary");
  return response.data;
};
