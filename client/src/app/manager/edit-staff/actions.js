const updateStaffDetails = async (itemData) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/users/editStaff",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData, (key, value) => {
          if (key === "pay") {
            return parseFloat(value);
          }
          return value;
        }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update item details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating item details:", error);
    throw error;
  }
};

async function deleteStaff(item) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/users/deleteStaff",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

export { updateStaffDetails, deleteStaff };

export async function fetchStaff(itemID) {
  try {
    let items = await fetch("http://127.0.0.1:8080/api/v1/users/getStaff").then(
      (res) => res.json(),
    );
    for (let item of items["items"]) {
      if (item._id.$oid === itemID) {
        return item;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}
