/**
 * Test script to verify backend connection
 * Run this with: node test-connection.js
 */

// Using built-in fetch (Node.js 18+)

const BASE_URL = 'http://localhost:5000';

async function testBackend() {
  console.log('🧪 Testing backend connection...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test login endpoint
    console.log('\n2. Testing login endpoint...');
    const loginResponse = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'Quophy2k1', password: '5555' })
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login test:', loginData);

    // Test inventory endpoint
    console.log('\n3. Testing inventory endpoint...');
    const inventoryResponse = await fetch(`${BASE_URL}/api/inventory`);
    const inventoryData = await inventoryResponse.json();
    console.log('✅ Inventory test:', inventoryData);

    console.log('\n🎉 All tests passed! Backend is ready to connect.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   - MySQL server is running');
    console.log('   - Database "resturant_db" exists');
    console.log('   - Backend server is running on port 5000');
  }
}

testBackend();
