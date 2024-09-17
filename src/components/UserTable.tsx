"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  Button,
} from "@mui/material";
import UserRow from "./UserRow";
import {
  getInitialData,
  updateFilter,
  filter,
  clearFilters,
} from "@/state/usersTable/usersTableSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import { useEffect } from "react";
import { Header, User } from "@/types";

type TableHeader = {
  field: Header;
  headerName: string;
  width: number;
};

const tableHeaders: TableHeader[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 200 },
];

export default function UserTable() {
  const usersTableState = useSelector((state: RootState) => state.usersTable);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  return (
    <>
      <TableContainer component={Paper}>
        <Button
          onClick={() => {
            dispatch(clearFilters());
            dispatch(filter());
          }}
        >
          Clear filters
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>
                  <Input
                    sx={{
                      "&::before": { borderBottom: "none" },
                    }}
                    placeholder={header.headerName}
                    value={usersTableState.filters[header.field]}
                    onChange={(e) => {
                      dispatch(
                        updateFilter({
                          property: header.field,
                          value: e.target.value,
                        })
                      );
                      dispatch(filter());
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersTableState.users.map((user: User) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
