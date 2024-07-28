import React, { Component } from 'react';
import TransactionsList from './components/TransactionsList';
import AddTransaction from './components/AddTransaction';

class App extends Component {
    handleTransactionAdded = () => {
        this.transactionsListRef.fetchTransactions();
    };

    render() {
        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-center text-4xl font-bold mb-8">Transactions App</h1>
                <div className="max-w-6xl mx-auto">
                    <AddTransaction onTransactionAdded={this.handleTransactionAdded} />
                    <TransactionsList ref={ref => (this.transactionsListRef = ref)} />
                </div>
            </div>
        );
    }
}

export default App;
