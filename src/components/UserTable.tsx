import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { User } from "../types";
import UserRow from "./UserRow";

interface TableProps {
  users: User[];
}

const tableHeaders = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 200 },
];

export default function UserTable({ users }: TableProps) {
  const headers = tableHeaders.map((header, index) => (
    <TableCell key={index}>{header.headerName}</TableCell>
  ));
  console.log(users);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
