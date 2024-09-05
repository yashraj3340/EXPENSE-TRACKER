import ExpenseList from "./components/ExpenseList";
import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import { Box, Container } from "@mui/material";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
  ]);

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <Container maxWidth="md">
      <Box className="container" p={4}>
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
        <Box mt={3}>
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </Box>
        <Box mt={3}>
          <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
