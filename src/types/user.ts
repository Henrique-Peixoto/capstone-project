// The format we want to return the user data
export type User = {
  id: string,
  email: string,
  role: string,
  createdAt: Date
}

// The format a user is store in the database
export type DBUserRow = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
}

export type DBUserWithPasswordRow = DBUserRow & {
  passwordHash: string | null;
}