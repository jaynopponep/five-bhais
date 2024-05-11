"use server";

import { redirect } from "next/dist/server/api-utils";

export async function fetchMenu() {
  try {
    // TODO: get req /get-menu endpoint when its implemented
    const menu = [
      { sectionTitle: "Appetizer", items: [] },
      { sectionTitle: "Main", items: [] },
      { sectionTitle: "Dessert", items: [] },
      { sectionTitle: "Drinks", items: [] },
      { sectionTitle: "Sides", items: [] },
    ];

    let items = await fetch(
      "http://127.0.0.1:8080/api/v1/users/getMenuItems",
    ).then((res) => res.json());
    for (let item of items["items"]) {
      if (item.category.toLowerCase() === "Appetizer".toLowerCase()) {
        menu[0].items.push(item);
      } else if (item.category.toLowerCase() === "Main".toLowerCase()) {
        menu[1].items.push(item);
      } else if (item.category.toLowerCase() === "Dessert".toLowerCase()) {
        menu[2].items.push(item);
      } else if (item.category.toLowerCase() === "Drink".toLowerCase()) {
        menu[3].items.push(item);
      } else if (item.category.toLowerCase() === "Side".toLowerCase()) {
        menu[4].items.push(item);
      }
    }
    return menu;
  } catch (error) {
    throw error;
  }
}
