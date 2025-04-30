import fs from "fs/promises";
import path from "path";

const filePath = path.resolve(process.cwd(), "src/users.json");

export async function getUsers() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function saveUser(newUser: { name: string; email: string; password: string }) {
  const users = await getUsers();
  users.push({ ...newUser, loggedIn: false });
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email: string) {
  const users = await getUsers();
  return users.find((u: User) => u.email === email);
}

export async function signOut(email: string) {
  const users = await getUsers();
  const signOutUser = users.map((u: User) => {
    if (u.email === email) {
      return { ...u, loggedIn: false };
    } else {
      return u;
    }
  });
  await fs.writeFile(filePath, JSON.stringify(signOutUser, null, 2));
}
