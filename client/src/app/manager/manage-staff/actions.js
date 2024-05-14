"use server";

export async function fetchStaff() {
    try {
        let response = await fetch(
            "http://127.0.0.1:8080/api/v1/users/getStaff",
        );
        let data = await response.json();
        return data.staff_members;
    } catch (error) {
        throw error;
    }
}

export async function deleteStaff(item) {
    try {
        const response = await fetch("http://localhost:8080/api/v1/users/deleteStaff", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        console.log(item)
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}
