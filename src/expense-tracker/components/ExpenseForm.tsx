import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories as expenseCategories } from "../categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faList,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const categories = ["Groceries", "Utilities", "Entertainment"] as const;

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "description should be atleast 3 characters." })
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
    <div className="col-12 col-md-6 mx-auto" style={{ maxWidth: "500px" }}>
      <h1 className="text-center form-heading">EXPENSE TRACKER</h1>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3 text-center">
          <label htmlFor="description" className="form-label center-form">
            <FontAwesomeIcon icon={faInfo} className="icon" />
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
            {...register("description")}
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="amount" className="form_label center-form">
            <FontAwesomeIcon icon={faDollarSign} className="icon" />
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="error-message">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="category" className="form-label center-form">
            <FontAwesomeIcon icon={faList} className="icon" />
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="error-message">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary center-form">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
