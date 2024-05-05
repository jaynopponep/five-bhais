"use server";

export async function fetchRecentDrivers() {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    // TODO: post req to endpoints when they are implemented
    // we want to fetch the last three drivers the user had
    const lastThreeDrivers = await response.json();
    return lastThreeDrivers;
  } catch (error) {
    throw error;
  }
}

export async function postReview(formData) {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/post-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(formData)
    });
  } catch (error) {
    console.error('Error occurred when posting review:', error);
    throw error;
  }
  try {
    return { status: 200 };
  } catch (error) {
    throw error;
  }
}
