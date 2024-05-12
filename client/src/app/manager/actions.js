"use server";

import { redirect } from "next/dist/server/api-utils";

export async function fetchStaff() {
    try {
        const staff = [
            { sectionTitle: "FoodImporter", staff_members: [] },
            { sectionTitle: "DeliveryDriver", staff_members: [] },
            { sectionTitle: "Chef", staff_members: [] },
        ];

        let items = await fetch(
            "http://127.0.0.1:8080/api/v1/users/getStaff",
        ).then((res) => res.json());
        for (let staff of staff["staff_members"]) {
            if (staff.category.toLowerCase() === "FoodImporter".toLowerCase()) {
                staff[0].staff_members.push(staff);
            } else if (staff.category.toLowerCase() === "DeliveryDriver".toLowerCase()) {
                staff[1].staff_members.push(staff);
            } else if (staff.category.toLowerCase() === "Chef".toLowerCase()) {
                staff[2].staff_members.push(staff);
            }
        }
        return staff;
    } catch (error) {
        throw error;
    }
}
