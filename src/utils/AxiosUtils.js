import axios from "axios";
import { STORED_AUTH_TOKEN } from "./Constants";

export const jsonContentTypeConfig = {
    headers: {
      'Content-Type': 'application/json',
    }
};

export function setTokenHeader() {
  const authToken = localStorage.getItem(STORED_AUTH_TOKEN)

  if(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}