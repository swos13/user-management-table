import type { User } from "./types";

export async function getUsers(): Promise<User[]> {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error.message));
  //TODO: handle errors
  return data;
}
