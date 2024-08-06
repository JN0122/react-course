import { formatter } from "../util/investment";
import { calculateInvestmentResults } from "../util/investment";

export function ResultTable({ userInput }) {
  const tableData = calculateInvestmentResults(userInput);
  return (
    <table id="result">
      <thead>
        <tr>
          <td>Year</td>
          <td>Investment Value</td>
          <td>Interest(Year)</td>
          <td>Total Investment</td>
          <td>Invested Capital</td>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex, rows) => {
          const initialInvestment = (rows[0].valueEndOfYear =
            rows[0].interest - rows[0].annualInvestment);
          const totalInterest =
            row.valueEndOfYear -
            row.annualInvestment * row.year -
            initialInvestment;
          const totalAmounInvested = row.valueEndOfYear - totalInterest;

          return (
            <tr key={rowIndex}>
              <td>{row.year}</td>
              <td>{formatter.format(row.valueEndOfYear)}</td>
              <td>{formatter.format(row.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmounInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
