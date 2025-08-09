/**
 * Simple test script to verify the API endpoints
 * Run with: node test-api.js
 * 
 * Make sure to update the BASE_URL to your deployed Vercel URL
 * or use http://localhost:3000 for local testing
 */

const BASE_URL = 'http://localhost:3000'; // Change this to your Vercel URL

async function testAPI() {
  console.log('🚀 Testing Authentication API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);

    // Test 2: Register user
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123',
        name: 'Test User'
      })
    });

    const registerData = await registerResponse.json();
    if (registerData.success) {
      console.log('✅ Registration successful');
      const token = registerData.data.token;

      // Test 3: Login
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123'
        })
      });

      const loginData = await loginResponse.json();
      if (loginData.success) {
        console.log('✅ Login successful');

        // Test 4: Get profile
        console.log('\n4. Testing profile retrieval...');
        const profileResponse = await fetch(`${BASE_URL}/api/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const profileData = await profileResponse.json();
        if (profileData.success) {
          console.log('✅ Profile retrieved:', profileData.data.user.name);

          // Test 5: Update profile
          console.log('\n5. Testing profile update...');
          const updateResponse = await fetch(`${BASE_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              name: 'Updated Test User'
            })
          });

          const updateData = await updateResponse.json();
          if (updateData.success) {
            console.log('✅ Profile updated:', updateData.data.user.name);
          } else {
            console.log('❌ Profile update failed:', updateData.message);
          }

          // Test 6: Token verification
          console.log('\n6. Testing token verification...');
          const verifyResponse = await fetch(`${BASE_URL}/api/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            console.log('✅ Token verified for:', verifyData.data.email);
          } else {
            console.log('❌ Token verification failed:', verifyData.message);
          }

        } else {
          console.log('❌ Profile retrieval failed:', profileData.message);
        }
      } else {
        console.log('❌ Login failed:', loginData.message);
      }
    } else {
      console.log('❌ Registration failed:', registerData.message);
    }

    console.log('\n🎉 API testing complete!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n💡 Make sure the server is running:');
    console.log('   npm run dev');
  }
}

// Run the test
testAPI();
