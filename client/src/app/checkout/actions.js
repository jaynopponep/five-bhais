"use server";

export async function placeOrder(cart, formData, total) {
  try {
    // TODO: send req /place-order endpoint when its implemented
    const order = {
      items: [],
      total: total,
      orderType: formData.orderType,
      address: `${formData.address}, ${formData.address2}, ${formData.city}, ${formData.state}, ${formData.zip}`,
      user: "sam" // TODO: get user from getUser function when its implemented
    }
    for (const item of cart) {
      order.items.push({
        item: item._id.$oid,
        quantity: item.quantity
      });
    }
    // ping the api
    let response = await fetch("http://localhost:8080/api/v1/users/order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const newBalance = response.json();
    return newBalance;
  } catch (error) {
    console.error('An error occurred when trying to send a request', error);
    throw error;
  }
}


