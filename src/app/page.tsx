import getUsers from "../api";
import type { User } from "../types";
import UserTable from "@/components/UserTable";

export default async function Home() {
  const users: User[] = await getUsers();

  return <UserTable users={users}></UserTable>;
}
