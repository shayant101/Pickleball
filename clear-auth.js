// Simple script to clear authentication tokens from localStorage
// Run this in browser console if you're having auth issues

console.log('Clearing authentication tokens...');
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
console.log('Tokens cleared! Please refresh the page and login again.');