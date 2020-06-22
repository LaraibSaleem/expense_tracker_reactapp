import React, { useContext, useState } from 'react';
import { TransactionContext } from './transContext';


function Child() {

    let { transactions, addTransaction, deleteTransaction } = useContext(TransactionContext)
    let [newDesc, setDesc] = useState("");
    let [newAmount, setAmount] = useState(0);

    const handleAddition = (event) => {
        event.preventDefault();
        if (Number(newAmount) === 0) {
            alert("Please enter correct value.")
            return false
        }
        console.log(newDesc, newAmount);
        addTransaction({
            amount: Number(newAmount),
            desc: newDesc
        })

        setDesc('');
        setAmount(0);
    }


    const handleDeletion = (index) => {
        deleteTransaction(index)
    }



    const getIncome = () => {
        let income = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0)
                income += transactions[i].amount;
        }
        return income;
    }


    const getExpense = () => {
        let expense = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount < 0)
                expense += transactions[i].amount;
        }
        return expense;
    }


    return (
        <body>
            <div className="container">
                <h1 className="text-center">Expense Tracker</h1>

                <h3>Your Balance <br /> ${getIncome() + getExpense()} </h3>

                <div className="in_ex_cont">
                    <h3 className="in"> INCOME <br /> ${getIncome()} </h3>
                    <h3 className="ex"> EXPENSE <br /> ${getExpense()} </h3>
                </div>

                <h3>History</h3>
                <hr />
                <ul className="history">
                    {
                        transactions.map((transObj, ind) => {
                            return (
                                <>
                                    <button className='del' onClick={() => handleDeletion(ind)}>X</button>
                                    <li key={ind} className={transObj.amount > 0 ? 'in' : 'ex'}>
                                        <span> {transObj.desc}  </span>
                                        <span> ${transObj.amount}  </span>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>

                <h3> Add new trannsaction</h3>
                <hr />

                <form className="transaction-form" onSubmit={handleAddition}>
                    <label>
                        Enter Description <br />
                        <input type="text"
                            value={newDesc}
                            placeholder="Description of transaction"
                            onChange={(ev) => setDesc(ev.target.value)}
                            required />
                    </label>

                    <br />
                    <label>
                        Enter Amount <br />
                        <input type="number"
                            value={newAmount}
                            placeholder="Amount of transaction"
                            onChange={(ev) => setAmount(ev.target.value)}
                            required />
                    </label>

                    <br />
                    <input type="submit" value="Add Transaction" className="submitBtn" />
                </form>

                <hr />
                <center><footer>Made by Laraib Saleem</footer></center>

            </div>
        </body>
    );
}

export default Child;
