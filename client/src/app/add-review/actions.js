"use server";

// export async function fetchRecentDrivers() {
//   try {
//     const response = await fetch('http://localhost:8080/api/v1/users/', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//     // TODO: post req to endpoints when they are implemented
//     // we want to fetch the last three drivers the user had
//     const lastThreeDrivers = await response.json();
//     return lastThreeDrivers;
//   } catch (error) {
//     throw error;
//   }
// } ^ IMPLEMENTATION WITHOUT PLACEHOLDER, WORK ON THIS WITH GET USER FUNCTION TO OBTAIN LAST THREE DRIVERS

export async function fetchRecentDrivers() {
  try {
    // TODO: post req to endpoints when they are implemented
    // we want to fetch the last three drivers the user had
    const lastThreeDrivers = [
      { name: "Sam R." },
      { name: "John D." },
      { name: "Jane S." },
    ];
    return lastThreeDrivers;
  } catch (error) {
    throw error;
  }
}

export async function postReview(formData) {
  try {
    const postData = {
      ...formData,
      author: "placeholder author"
    };
    if (postData.driverSelection === "")
      delete postData.driverSelection;
    const response = await fetch('http://localhost:8080/api/v1/users/post-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    if (response.ok) return data;
    else throw new Error(data.error);
  } catch (error) {
    console.error('Error occurred when posting review:', error);
    throw error;
  }
}
