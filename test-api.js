// Simple API test script
// Run with: node test-api.js

const testAPI = async () => {
    const baseUrl = 'http://localhost:5000';
    
    console.log('🧪 Testing API Endpoints...\n');
    
    // Test 1: Check existing users
    try {
        const usersResponse = await fetch(`${baseUrl}/users`);
        const users = await usersResponse.json();
        console.log('📋 Current Users:', users);
    } catch (error) {
        console.log('❌ Failed to fetch users:', error.message);
    }
    
    // Test 2: Try login with hardcoded user
    try {
        const loginResponse = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: '9876543210',
                password: 'password123'
            })
        });
        const loginResult = await loginResponse.json();
        console.log('🔐 Login Test Result:', loginResult);
    } catch (error) {
        console.log('❌ Login test failed:', error.message);
    }
    
    // Test 3: Check passbook
    try {
        const passbookResponse = await fetch(`${baseUrl}/check-passbook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                passbook: '12345678901234567'
            })
        });
        const passbookResult = await passbookResponse.json();
        console.log('📖 Passbook Test Result:', passbookResult);
    } catch (error) {
        console.log('❌ Passbook test failed:', error.message);
    }
    
    console.log('\n✅ API Tests Complete!');
};

testAPI();
