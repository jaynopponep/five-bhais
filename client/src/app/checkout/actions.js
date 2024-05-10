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
    return order;
  } catch (error) {
    console.error('An error occurred when trying to send a request', error);
    throw error;
  }
}


