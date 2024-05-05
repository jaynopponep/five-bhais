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
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Registration failed: ', errorResponse.message);
      throw new Error(errorResponse.message || 'Registration failed');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error occurred during registration:', error);
    throw error;
  }
}