"use server";

export default async function signUp(formData) {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Registration failed: ', data.error || data); // Use 'data.error' based on your backend error key
      throw new Error(data.error || 'Registration failed');  // Use the error from the backend if available
    }
    console.log('Successful Registration:', data);
    return data;
  } catch (error) {
    console.error('Error occurred during registration:', error);
    throw error;
  }
}