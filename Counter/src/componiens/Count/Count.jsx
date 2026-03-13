import { useReducer } from "react";
import ButtonPlus from "../ButtonPlus/ButtonPlus"
import ButtonMinus from "../ButtonMinus/ButtonMinus"
import ButtonReset from "../ButoonReset/ButoonReset"
import Message from "../Messenge/Mesenge"
import initialState, { countReducer } from "../../store/counter-store.js";


export default function Count() {

    const [state, dispatch] = useReducer(countReducer, initialState);

    return (
        <main className="wrapper">

            <div className="container">
                <h2>Счетчик: {state.count}</h2>

                <div className="row">
                    <ButtonPlus dispatch={dispatch} />
                    <ButtonMinus dispatch={dispatch} />
                    <ButtonReset dispatch={dispatch} />
                </div>

                {state.text && <Message state={state.text} />}
            </div>

        </main>
    )
}