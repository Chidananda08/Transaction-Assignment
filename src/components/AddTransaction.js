import React, { Component } from 'react';

class AddTransaction extends Component {
    state = {
        type: 'credit',
        amount: '',
        description: '',
        date: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { type, amount, description, date } = this.state;
        const transaction = {
            id: Date.now(),
            type,
            amount: parseFloat(amount),
            description,
            date,
            running_balance: this.calculateRunningBalance(type, parseFloat(amount))
        };
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        this.setState({ type: 'credit', amount: '', description: '', date: '' });
        this.props.onTransactionAdded();
    };

    calculateRunningBalance = (type, amount) => {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let lastBalance = transactions.length ? transactions[transactions.length - 1].running_balance : 0;
        return type === 'credit' ? lastBalance + amount : lastBalance - amount;
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Type:</label>
                    <select
                        name="type"
                        value={this.state.type}
                        onChange={this.handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Add Transaction
                </button>
            </form>
        );
    }
}

export default AddTransaction;
