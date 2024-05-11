"use server";

export async function placeOrder(formData, userEmail, total) {
  const order = {
    // ^ add cart again after testing
    // items: [],
    total: total,
    orderType: formData.orderType,
    address: `${formData.address}, ${formData.address2}, ${formData.city}, ${formData.state}, ${formData.zip}`,
    email: userEmail,
  };
  // for (const item of cart) {
  //   order.items.push({
  //     item: item._id.$oid,
  //     quantity: item.quantity,
  //   });
  // }
  console.log(order);
  try {
    const response = await fetch("http://localhost:8080/api/v1/users/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const placed = await response.json();
    return placed;
  } catch (error) {
    console.error("An error occurred when trying to send a request", error);
    throw error;
  }
}
