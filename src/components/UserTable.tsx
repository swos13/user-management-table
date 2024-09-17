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
  Box,
  Typography,
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
};

const tableHeaders: TableHeader[] = [
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
  { field: "email", headerName: "Email" },
  { field: "phone", headerName: "Phone" },
];

export default function UserTable() {
  const usersTableState = useSelector((state: RootState) => state.usersTable);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          mt: "32px",
          textAlign: "center",
          fontSize: { xs: "16px", sm: "30px" },
        }}
      >
        User management table
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          p: "32px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(clearFilters());
            dispatch(filter());
          }}
          sx={{
            width: { xs: "120px", sm: "150px", md: "180px" },
            textAlign: "center",
            fontSize: { xs: "10px", sm: "14px", md: "18px" },
          }}
          disabled={Object.keys(usersTableState.filters).length === 0}
        >
          Clear filters
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& input": {
                    fontSize: { xs: "10px", sm: "12px", md: "16px" },
                  },
                }}
              >
                {tableHeaders.map((header, index) => (
                  <TableCell key={index}>
                    <Input
                      sx={{
                        "&::before": { borderBottom: "none" },
                      }}
                      placeholder={header.headerName}
                      value={usersTableState.filters[header.field] || ""}
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
            <TableBody
              sx={{
                "& td": { fontSize: { xs: "8px", sm: "10px", md: "14px" } },
              }}
            >
              {usersTableState.users.map((user: User) => (
                <UserRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
