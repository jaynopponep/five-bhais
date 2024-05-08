"use server";

export default async function login(formData) {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Could not sign up, check endpoint request', errorResponse.message);
      throw new Error(errorResponse.message || 'Sign in failed');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('An error occurred when trying to send a request', error);
    throw error;
  }
}


