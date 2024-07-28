import React, { Component } from 'react';

class TransactionsList extends Component {
    state = {
        transactions: []
    };

    componentDidMount() {
        this.fetchTransactions();
    }

    fetchTransactions = () => {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.setState({ transactions });
    };

    render() {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Transactions List</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Date</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Credit</th>
                            <th className="py-2">Debit</th>
                            <th className="py-2">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td className="border px-4 py-2 text-center">{transaction.date}</td>
                                <td className="border px-4 py-2 text-center">{transaction.description}</td>
                                <td className="border px-4 py-2 text-center">{transaction.type === 'credit' ? transaction.amount : ''}</td>
                                <td className="border px-4 py-2 text-center">{transaction.type === 'debit' ? transaction.amount : ''}</td>
                                <td className="border px-4 py-2 text-center">{transaction.running_balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TransactionsList;
