const fetchItemDetails = async (itemId) => {
    try {
        const response = await fetch(`/api/items/${itemId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch item details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching item details:', error);
        throw error;  // Rethrowing the error allows for handling it in the component.
    }
};

const updateItemDetails = async (itemData) => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/users/editItem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        if (!response.ok) {
            throw new Error('Failed to update item details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating item details:', error);
        throw error;  // Rethrowing the error allows for handling it in the component.
    }
};

export { fetchItemDetails, updateItemDetails };
