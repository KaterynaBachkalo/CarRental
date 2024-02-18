import axios from "axios";

axios.defaults.baseURL = "https://65395de9e3b530c8d9e85344.mockapi.io";

export const fetchAllCars = async (params) => {
  const searchParams = new URLSearchParams(params);

  const queryString = searchParams.toString();

  const { data } = await axios.get(`/adverts?${queryString}`);
  return data;
};
