import TotalExpenses from "./TotalExpenses"
import TotalIncome from "./TotalIncome"
import Remainder from "./Remainder"

export default function Results({ }) {
    return (
        <main className="results">
            <div className="results__container container row">
                <TotalExpenses />
                <TotalIncome />
                <Remainder />
            </div>
        </main>
    )
}