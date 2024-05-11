"use server";

import axios from 'axios';

/**
 * Posts new employee data to the backend.
 * @param {Object} formData - The data collected from the form.
 * @returns {Promise<Object>} - The response from the server.
 */
export async function postNewEmployee(formData) {
  try {
    // Convert pay to a number to ensure data integrity
    const postData = {
      ...formData,
      pay: Number(formData.pay) // Ensure pay is correctly formatted as a number
    };

    // Placeholder: This is where the backend will connect
    const response = await axios.post('placeholder, this is where the back end will connect', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data; // Successful response from the server
    } else {
      throw new Error('Failed to add employee: ' + response.data.error);
    }
  } catch (error) {
    console.error('Error posting new employee:', error);
    throw error; // Rethrow to be handled by the caller
  }
}
