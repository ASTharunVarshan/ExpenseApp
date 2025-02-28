import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
const App=()=> {
  return(
    <div>
     <ExpenseForm/>
     <ExpenseTable/>
    </div>
  );
};
export default App;