"use server";

import { redirect } from "next/dist/server/api-utils";

export async function fetchMenu() {
  try {
    // TODO: get req /get-menu endpoint when its implemented
    const menuItems = [
      {
        "_id": "ObjectId('663944150bf06b32f5a7f4a8')",
        "name": "pancakes",
        "price": 3.49,
        "description": "fluffy pancakes",
        "category": "appetizer",
        "chef": "joey"
      },
      {
        "_id": "ObjectId('663cdfccaea83b835898c71b')",
        "name": "cheese burger",
        "price": 8,
        "description": "bread, meat, cheese",
        "category": "main",
        "chef": "joey"
      },
      {
        "_id": "ObjectId('663cdfdbaea83b835898c71c')",
        "name": "double cheese burger",
        "price": 10,
        "description": "bread, meat, cheese",
        "category": "main",
        "chef": "joey"
      },
      {
        "_id": "ObjectId('66394a21e6d540b13121965b')",
        "name": "test",
        "price": 8.49,
        "description": "the desc",
        "category": "dessert",
        "chef": "joey"
      },
      {
        "_id": "ObjectId('663cdffdaea83b835898c71d')",
        "name": "Mango Lassi",
        "price": 1.49,
        "description": "mango yogurt drink",
        "category": "drinks",
        "chef": "joey"
      },
      {
        "_id": "ObjectId('663949ba3f0f3da23335d544')",
        "name": "Garlic Naan",
        "price": 1.25,
        "description": "fluffy, buttery, garlicy",
        "category": "sides",
        "chef": "joey"
      },
    ]

    // const menu = [
    //   { "sectionTitle": "Appetizer", "items": [menuItem, menuItem, menuItem] },
    //   { "sectionTitle": "Main", "items": [menuItem, menuItem, menuItem] },
    //   { "sectionTitle": "Dessert", "items": [menuItem, menuItem, menuItem] },
    //   { "sectionTitle": "Drinks", "items": [menuItem, menuItem, menuItem] },
    //   { "sectionTitle": "Sides", "items": [menuItem, menuItem, menuItem] },
    // ]
    const menu = [
      { "sectionTitle": "Appetizer", "items": [] },
      { "sectionTitle": "Main", "items": [] },
      { "sectionTitle": "Dessert", "items": [] },
      { "sectionTitle": "Drinks", "items": [] },
      { "sectionTitle": "Sides", "items": [] },
    ]
    menuItems.forEach((item) => {
      switch (item.category) {
        case "appetizer":
          menu[0].items.push(item);
          break;
        case "main":
          menu[1].items.push(item);
          break;
        case "dessert":
          menu[2].items.push(item);
          break;
        case "drinks":
          menu[3].items.push(item);
          break;
        case "sides":
          menu[4].items.push(item);
          break;
        default:
          break;
      }
    });

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
      userType: "customer"
    }
    return user.userType;
  } catch (error) {
    redirect("/error")
  }
}