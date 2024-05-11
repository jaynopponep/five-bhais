"use client"

export async function fetchUser() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) return { role: "surfer" };
  return user;
}

export async function setUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

export async function logout() {
  sessionStorage.removeItem("user");
}