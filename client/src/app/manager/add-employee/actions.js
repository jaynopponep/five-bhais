"use server";

export default async function postNewStaff(formData) {
    // TODO: use getUser function to get the current user and make
    // the chef field dynamic
    try {
        const postData = {
            ...formData,
            chef: "joey"
        };
        const response = await fetch('http://127.0.0.1:8080/api/v1/users/createStaff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData, (key, value) => {
                if (key === 'price') {
                    return parseFloat(value);
                }
                return value;
            })
        });
        const data = await response.json();
        if (response.ok) return data;
        else throw new Error(data.error);

    } catch (error) {
        throw error;
    }
}