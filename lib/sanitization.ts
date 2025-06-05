import DOMPurify from 'dompurify';
import validator from 'validator';

// Initialize DOMPurify for browser environment
const createDOMPurify = () => {
  if (typeof window !== 'undefined') {
    return DOMPurify;
  }
  // For server-side rendering, we'll use a simpler approach
  return null;
};

const purify = createDOMPurify();

/**
 * Sanitizes a string input by removing potentially harmful content
 * @param input - The string to sanitize
 * @param allowHTML - Whether to allow HTML tags (default: false)
 * @returns Sanitized string
 */
export function sanitizeString(input: string, allowHTML: boolean = false): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Limit the length of the input to 10000 characters
  if (input.length > 2000) {
    console.log('Input too long');
    return '';
  }

  // Trim whitespace
  let sanitized = input.trim();

  if (allowHTML && purify) {
    // If HTML is allowed, sanitize it but keep safe HTML
    sanitized = purify.sanitize(sanitized, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
      ALLOWED_ATTR: []
    });
  } else {
    // If no HTML allowed, escape all HTML entities
    sanitized = validator.escape(sanitized);
  }

  return sanitized;
}

/**
 * Sanitizes and validates an email address
 * @param email - The email to sanitize and validate
 * @returns Object with sanitized email and validation status
 */
export function sanitizeEmail(email: string): { email: string; isValid: boolean } {
  const sanitized = sanitizeString(email).toLowerCase();
  const isValid = validator.isEmail(sanitized);
  
  return {
    email: sanitized,
    isValid
  };
}

/**
 * Sanitizes a phone number
 * @param phone - The phone number to sanitize
 * @returns Sanitized phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except + and spaces
  const sanitized = phone.replace(/[^\d\s\+\-\(\)]/g, '').trim();
  return sanitized;
}

/**
 * Sanitizes a name field (first name, last name, company name)
 * @param name - The name to sanitize
 * @returns Sanitized name
 */
export function sanitizeName(name: string): string {
  if (!name) return '';
  
  // Remove HTML and special characters, but allow letters, spaces, hyphens, and apostrophes
  let sanitized = sanitizeString(name);
  
  // Additional filtering for names - only allow letters, spaces, hyphens, and apostrophes
  sanitized = sanitized.replace(/[^a-zA-ZÀ-ÿ\s\-'\.]/g, '').trim();
  
  // Limit length to prevent extremely long inputs
  return sanitized.substring(0, 100);
}

/**
 * Sanitizes a text message or comment
 * @param message - The message to sanitize
 * @returns Sanitized message
 */
export function sanitizeMessage(message: string): string {
  if (!message) return '';
  
  // Remove harmful HTML but allow basic formatting
  let sanitized = sanitizeString(message, false);
  
  // Limit length to prevent extremely long messages
  sanitized = sanitized.substring(0, 5000);
  
  return sanitized;
}

/**
 * Sanitizes form data for contact submissions
 * @param formData - The form data object to sanitize
 * @returns Sanitized form data
 */
export function sanitizeContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}): {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  const firstName = sanitizeName(formData.firstName);
  const lastName = sanitizeName(formData.lastName);
  const company = sanitizeName(formData.company);
  const message = sanitizeMessage(formData.message);
  const emailResult = sanitizeEmail(formData.email);
  
  // Validation
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!emailResult.isValid) errors.push('Valid email is required');
  if (!company) errors.push('Company is required');
  if (!message) errors.push('Message is required');
  if (message.length < 10) errors.push('Message must be at least 10 characters long');
  
  return {
    firstName,
    lastName,
    email: emailResult.email,
    company,
    message,
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitizes form data for job applications
 * @param formData - The job application form data to sanitize
 * @returns Sanitized form data
 */
export function sanitizeJobApplicationForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  coverLetter: string;
}): {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  const firstName = sanitizeName(formData.firstName);
  const lastName = sanitizeName(formData.lastName);
  const phone = sanitizePhone(formData.phone || '');
  const coverLetter = sanitizeMessage(formData.coverLetter);
  const emailResult = sanitizeEmail(formData.email);
  
  // Validation
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!emailResult.isValid) errors.push('Valid email is required');
  if (!coverLetter) errors.push('Cover letter is required');
  if (coverLetter.length < 50) errors.push('Cover letter must be at least 50 characters long');
  
  return {
    firstName,
    lastName,
    email: emailResult.email,
    phone,
    coverLetter,
    isValid: errors.length === 0,
    errors
  };
} 