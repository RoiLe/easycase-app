export const validateName = (name) => /^[A-Za-z]{2,20}$/.test(name);
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone) => /^\+972\d{9}$/.test(phone);
export const normalizeEmail = (email) => email.toLowerCase();
