import { Typography } from "@mui/material";
import getUsers from "../api";
import type { User } from "../types";

export default async function Home() {
  const users: User[] = await getUsers();
  console.log("Console from home", users);

  return (
    <>
      <Typography variant="h1">User management table</Typography>
    </>
  );
}
