export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export type Header = "name" | "username" | "email" | "phone";

export type Filters = {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
};
