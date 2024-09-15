import { User } from "@/types";
import { TableCell, TableRow } from "@mui/material";

export default function UserRow({ user }: { user: User }) {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
    </TableRow>
  );
}
