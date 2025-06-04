//chứa các hàm kiểm tra tính hợp lệ của dữ liệu
//tái sử dụng nhiều nơi
export const isValidName = (name: any): string | null => {
  if (typeof name !== 'string') return "Name must be a string";
  if (name !== name.trim()) return "Name must not have leading or trailing whitespace";
  if (name.trim().length === 0) return "Name cannot be empty";
  return null;
};
export const isValidAge = (age: any): string | null => {
  if (typeof age !== 'number') return "Age must be a number";
  if (age <= 0) return "Age must be greater than 0";
  return null;
};

export const isValidEmail = (email: any): string | null => {
  if (typeof email !== 'string') return "Email must be a string";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";

  return null;
};