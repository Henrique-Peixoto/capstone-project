import bcrypt from "bcryptjs";
import { MIN_PASSWORD_LENGTH, PASSWORD_HASHING_KEY } from "../constants";
import { AppError } from "../errors/AppError";
import { findUserByEmail, createUser } from "../repositories/user.repository"

export async function registerUser(email: string, password: string): Promise<void> {
  if (!hasRequiredFields(email, password)) {
    throw new AppError(400, 'Email and password are required!');
  }

  if (!isPasswordLongEnough(password)) {
    throw new AppError(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new AppError(409, `The email ${normalizedEmail} is already registered!`);
  }

  const hashedPassword = await bcrypt.hash(password, PASSWORD_HASHING_KEY);
  await createUser(normalizedEmail, hashedPassword);
}

function hasRequiredFields(email: string, password: string): boolean {
  return Boolean(email) && Boolean(password);
}

function isPasswordLongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}