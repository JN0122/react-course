export function isValidText(text: string | undefined) {
  return text.trim().length > 0;
}

export function isValidEmail(email: string | undefined) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function isValidFile(file: File | undefined) {
  return file !== null && file.size > 0;
}
