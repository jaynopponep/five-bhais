"use server";

export default async function login(formData) {
  try {
    // TODO: post req /login endpoint when its implemented
    const testUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      initialDeposit: formData.initialDeposit,
      password: formData.password,
    }
    return testUser
  } catch (error) {
    throw error;
  }
}