"use server";

import { redirect } from "next/dist/server/api-utils";

export async function fetchMenu() {
  try {
    // TODO: get req /get-menu endpoint when its implemented
    const menuItem = {
      "name": "Test Menu Item",
      "price": 10.99,
      "description": "This is a test menu item",

    }
    const menu = [
      { "sectionTitle": "Appetizer", "items": [menuItem, menuItem, menuItem] },
      { "sectionTitle": "Main", "items": [menuItem, menuItem, menuItem] },
      { "sectionTitle": "Dessert", "items": [menuItem, menuItem, menuItem] },
      { "sectionTitle": "Drinks", "items": [menuItem, menuItem, menuItem] },
      { "sectionTitle": "Sides", "items": [menuItem, menuItem, menuItem] },
    ]
    return menu
  } catch (error) {
    throw error;
  }
}

export async function fetchUserType() {
  try {
    // TODO: get req /get-user endpoint when its implemented (rn its dummy)

    // may be a good idea to put this function somewhere centeral cuz its needed in multiple places
    const user = {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      userType: "chef"
    }
    return user.userType;
  } catch (error) {
    redirect("/error")
  }
}
export async function editItem(formData) {
  try {
    const response = await fetch('http://127.0.0.1:8080/api/v1/users/editItem', {
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

export async function deleteItem(name) {
  try {
    const response = await fetch('http://127.0.0.1:8080/api/v1/users/deleteItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    const data = await response.json();
    if (response.ok) return data;
    else throw new Error(data.error);
  } catch (error) {
    throw error;
  }
}
export async function deleteManyItems(names) {
  try {
    const response = await fetch('http://127.0.0.1:8080/api/v1/users/deleteManyItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: names.map(name => ({ name })) })
    });
    const data = await response.json();
    if (response.ok) return data;
    else throw new Error(data.error);
  } catch (error) {
    throw error;
  }
}
