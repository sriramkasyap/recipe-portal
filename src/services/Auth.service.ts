import { CredentialResponse } from "../types/User.type";

export const login = async (credentialResponse: CredentialResponse) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentialResponse),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response.json();
};

export const verifyUser = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      credentials: "include",
    });

    let result = await response.json();

    if (result.user) {
      return result.user;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};
