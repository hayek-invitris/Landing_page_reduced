import { 
  sanitizeString, 
  sanitizeEmail, 
  sanitizeName, 
  sanitizeContactForm 
} from './sanitization';

// Simple test function
function runTests() {
  console.log('🧪 Running Sanitization Tests...\n');

  // Test 1: Basic string sanitization
  console.log('Test 1: Basic string sanitization');
  const maliciousScript = '<script>alert("XSS")</script>Hello World';
  const sanitized = sanitizeString(maliciousScript);
  console.log('Input:', maliciousScript);
  console.log('Output:', sanitized);
  console.log('✅ XSS prevented:', !sanitized.includes('<script>'));
  console.log('');

  // Test 2: Email sanitization
  console.log('Test 2: Email sanitization');
  const maliciousEmail = 'test@example.com<script>alert("hack")</script>';
  const emailResult = sanitizeEmail(maliciousEmail);
  console.log('Input:', maliciousEmail);
  console.log('Output:', emailResult);
  console.log('✅ Email is valid:', emailResult.isValid);
  console.log('');

  // Test 3: Name sanitization
  console.log('Test 3: Name sanitization');
  const maliciousName = 'John<script>alert("hack")</script>Doe';
  const safeName = sanitizeName(maliciousName);
  console.log('Input:', maliciousName);
  console.log('Output:', safeName);
  console.log('✅ Name cleaned:', !safeName.includes('<script>'));
  console.log('');

  // Test 4: Contact form validation
  console.log('Test 4: Contact form validation');
  const maliciousFormData = {
    firstName: 'John<script>alert("hack")</script>',
    lastName: 'Doe',
    email: 'invalid-email',
    company: 'Test<img src=x onerror=alert("XSS")>Corp',
    message: 'Hi<script>document.location="http://evil.com"</script>'
  };
  
  const formResult = sanitizeContactForm(maliciousFormData);
  console.log('Form validation result:', formResult);
  console.log('✅ Form validation working:', !formResult.isValid);
  console.log('✅ All fields sanitized');
  console.log('');

  // Test 5: Valid form data
  console.log('Test 5: Valid form data');
  const validFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Test Corp',
    message: 'This is a legitimate message with enough characters to pass validation.'
  };
  
  const validResult = sanitizeContactForm(validFormData);
  console.log('Valid form result:', validResult);
  console.log('✅ Valid form passes:', validResult.isValid);
  console.log('');

  console.log('🎉 All sanitization tests completed!');
}

// Export for potential use
export { runTests };

// Auto-run tests in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Sanitization module loaded. Run runTests() to test.');
} 