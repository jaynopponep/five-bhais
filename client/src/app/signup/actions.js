"use server";

export default async function signUp(formData) {
  const response = await fetch('http://localhost:8080/api/v1/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  if (!response.ok) {
    throw new Error('Failed to register');
  }
  const data = await response.json();
}