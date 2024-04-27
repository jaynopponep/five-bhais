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
      userType: "surfer"
    }
    return user.userType;
  } catch (error) {
    redirect("/error")
  }
}