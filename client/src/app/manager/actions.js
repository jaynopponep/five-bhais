"use server";

import { redirect } from "next/dist/server/api-utils";

export async function fetchStaff() {
    try {
        const staffList = [
            { sectionTitle: "FoodImporter", staff_members: [] },
            { sectionTitle: "DeliveryDriver", staff_members: [] },
            { sectionTitle: "Chef", staff_members: [] },
        ];

        let staff = await fetch(
            "http://127.0.0.1:8080/api/v1/users/getStaff",
        ).then((res) => res.json());
        for (let member of staff["staff_members"]) {
            if (member.role.toLowerCase() === "FoodImporter".toLowerCase()) {
                staffList[0].staff_members.push(member);
            } else if (member.role.toLowerCase() === "DeliveryDriver".toLowerCase()) {
                staffList[1].staff_members.push(member);
            } else if (member.role.toLowerCase() === "Chef".toLowerCase()) {
                staffList[2].staff_members.push(member);
            }
        }
        console.log(staffList)
        return staffList;
    } catch (error) {
        throw error;
    }
}
