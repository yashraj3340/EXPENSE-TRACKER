import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No expenses
      </Typography>
    );
  }

  const totalAmount = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Amount</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Category</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Typography>{expense.description}</Typography>
              </TableCell>
              <TableCell>
                <Typography>${expense.amount.toFixed(2)}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{expense.category}</Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Total</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
