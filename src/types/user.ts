// The format we want to return the user data
export type User = {
  id: string,
  email: string,
  role: string,
  created_at: Date
}

// The format a user is store in the database
export type DBUserRow = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
}

export type DBUserWithPasswordRow = DBUserRow & {
  password_hash: string | null;
}

export type TokenPayload = {
  user_id: string;
  email: string;
  role: string;
}