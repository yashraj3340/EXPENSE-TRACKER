import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        onChange={(event) => onSelectCategory(event.target.value)}
        defaultValue="all"
        input={<OutlinedInput label="Category" />}
      >
        <MenuItem value="all">All categories</MenuItem>
        {["Groceries", "Utilities", "Entertainment"].map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ExpenseFilter;
