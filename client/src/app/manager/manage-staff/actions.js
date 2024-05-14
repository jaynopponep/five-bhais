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
