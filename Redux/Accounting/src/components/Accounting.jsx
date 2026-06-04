import Consamptions from "./Consamptions"
import Income from "./Income"

export default function Accounting({ }) {
    return (
        <main className="accounting">
            <div className="accounting__container container row">
                <Consamptions />
                <Income />
            </div>
        </main>
    )
}