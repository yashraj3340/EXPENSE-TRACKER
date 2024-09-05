import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, MenuItem, Button, FormControl, Box } from "@mui/material";
import "./App.css";

const categories = ["Groceries", "Utilities", "Entertainment"] as const;

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 1,
        boxShadow: 2,
        backgroundColor: "background.paper",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h1 className="form-heading">Track_My_Spend</h1>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        style={{ width: "100%" }}
      >
        <FormControl fullWidth margin="normal" error={!!errors.description}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            placeholder="Enter description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.amount}>
          <TextField
            id="amount"
            label="Amount"
            type="number"
            variant="outlined"
            placeholder="Enter amount"
            {...register("amount", { valueAsNumber: true })}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.category}>
          <TextField
            id="category"
            select
            label="Category"
            variant="outlined"
            {...register("category")}
            defaultValue=""
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            <MenuItem value="">Select a category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ExpenseForm;
