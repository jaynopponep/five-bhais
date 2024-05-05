"use server";

export default async function postNewItem(formData) {
  try {
    // TODO: post req /add-item endpoint when its implemented

    const response = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      category: formData.category,
      status: 200
    }

    return response
  } catch (error) {
    throw error;
  }
}