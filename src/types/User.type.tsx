export type User = {
  _id: string;
  name: string;
  email: string;
};

export type CredentialResponse = {
  credential: string;
  clientId: string;
  select_by: string;
};
