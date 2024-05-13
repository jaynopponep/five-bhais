"use server";

export async function postReservation(formData) {
  try {
    const response = await fetch('http://127.0.0.1:8080/api/v1/users/createReservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (response.ok) return data;
    else throw new Error(data.error);

  } catch (error) {
    throw error;
  }
}