// Contains data validation functions
// Reusable in many places

export const isValidName = (name: any): string | null => {
  if (typeof name !== 'string') return "Name must be a string";
  if (name !== name.trim()) return "Name must not have leading or trailing whitespace";
  if (name.trim().length === 0) return "Name cannot be empty";
  return null;
};

export const isValidAge = (age: any): string | null => {
  if (age <= 0) return "Age must be greater than 0";
  return null;
};

export const isValidEmail = (email: any): string | null => {
  if (typeof email !== 'string') return "Email must be a string";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";

  return null;
};

// Hàm chung kiểm tra whitespace cho bất kỳ trường nào
export const hasWhitespace = (value: string, fieldName: string): string | null => {
    if (value !== value.trim()) {
        return `${fieldName} must not have leading or trailing whitespace`;
        
    }
    return null;
};


// Kiểm tra cho Project
export const isValidProjectFields = (name: string, description: string): string | null => {
    const nameError = hasWhitespace(name, 'Name');
    if (nameError) return nameError;

    const descError = hasWhitespace(description, 'Description');
    if (descError) return descError;

    return null;
};

// Kiểm tra cho User
export const isValidUserFields = (name: string, email: string): string | null => {
    const nameError = hasWhitespace(name, 'Name');
    if (nameError) return nameError;

    const emailError = hasWhitespace(email, 'Email');
    if (emailError) return emailError;

    return null;
};

