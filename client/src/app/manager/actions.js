"use server";

import axios from 'axios';

/**
 * Posts new employee data to the backend.
 * @param {Object} formData - The data collected from the form.
 * @returns {Promise<Object>} - The response from the server.
 */
export async function postNewEmployee(formData) {
  try {
    const response = await axios.post('placeholder, this is where the back end will connect', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data; // Success
    } else {
      throw new Error('Failed to add employee: ' +
