import { useEffect, useState } from "react";
import "./App.css";

const initialTransactions = [
  { id: 1, title: "Freelance Project", category: "Income", amount: 15000, type: "income" },
  { id: 2, title: "Rent", category: "Housing", amount: 12000, type: "expense" },
  { id: 3, title: "Groceries", category: "Food", amount: 2450, type: "expense" },
  { id: 4, title: "Internet Bill", category: "Bills", amount: 999, type: "expense" },
];

function App() {
  const [page, setPage] = useState("Dashboard");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fintrack-transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Food",
    amount: "",
    type: "expense",
  });

  useEffect(() => {
    localStorage.setItem(
      "fintrack-transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  const formatMoney = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const addTransaction = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) return;

    const newTransaction = {
      id: Date.now(),
      title: form.title,
      category: form.category,
      amount: Number(form.amount),
      type: form.type,
    };

    setTransactions([newTransaction, ...transactions]);

    setForm({
      title: "",
      category: "Food",
      amount: "",
      type: "expense",
    });

    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + Number(transaction.amount);
      return acc;
    }, {});

  const maxCategoryAmount = Math.max(
    ...Object.values(categoryTotals),
    1
  );

  const renderDashboard = () => (
    <>
      <header className="topbar">
        <div>
          <p className="welcome">Welcome back 👋</p>
          <h1>Financial Overview</h1>
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Transaction
        </button>
      </header>

      <section className="cards">
        <div className="card balance-card">
          <div className="card-label">Total Balance</div>
          <h2>{formatMoney(balance)}</h2>
          <span className="card-sub">Available balance</span>
        </div>

        <div className="card">
          <div className="card-label">Total Income</div>
          <h2>{formatMoney(income)}</h2>
          <span className="positive">↗ Money received</span>
        </div>

        <div className="card">
          <div className="card-label">Total Expenses</div>
          <h2>{formatMoney(expenses)}</h2>
          <span className="negative">↘ Money spent</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Spending Overview</h3>
              <p>Your current income and expenses</p>
            </div>
            <span className="period">This Month</span>
          </div>

          <div className="chart">
            <div className="chart-bar income-bar">
              <span>{formatMoney(income)}</span>
            </div>

            <div className="chart-bar expense-bar">
              <span>{formatMoney(expenses)}</span>
            </div>

            <div className="chart-labels">
              <span>Income</span>
              <span>Expenses</span>
            </div>
          </div>
        </div>

        <div className="panel budget-panel">
          <div className="panel-header">
            <div>
              <h3>Monthly Budget</h3>
              <p>₹25,000 spending limit</p>
            </div>

            <span className="budget-percent">
              {Math.min(Math.round((expenses / 25000) * 100), 100)}%
            </span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((expenses / 25000) * 100, 100)}%`,
              }}
            />
          </div>

          <div className="budget-info">
            <span>Spent {formatMoney(expenses)}</span>
            <span>
              Remaining {formatMoney(Math.max(25000 - expenses, 0))}
            </span>
          </div>
        </div>
      </section>

      <section className="panel transactions">
        <div className="panel-header">
          <div>
            <h3>Recent Transactions</h3>
            <p>Your latest financial activity</p>
          </div>

          <span className="transaction-count">
            {transactions.length} transactions
          </span>
        </div>

        <TransactionList />
      </section>
    </>
  );

  const TransactionList = () => (
    <div className="transaction-list">
      {transactions.length === 0 ? (
        <p className="empty">No transactions yet.</p>
      ) : (
        transactions.map((transaction) => (
          <div className="transaction" key={transaction.id}>
            <div className="transaction-icon">
              {transaction.type === "income" ? "↗" : "↘"}
            </div>

            <div className="transaction-details">
              <strong>{transaction.title}</strong>
              <span>{transaction.category}</span>
            </div>

            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === "income" ? "+" : "-"}
              {formatMoney(transaction.amount)}
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteTransaction(transaction.id)}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );

  const renderTransactions = () => (
    <>
      <header className="topbar">
        <div>
          <p className="welcome">Manage your money</p>
          <h1>Transactions</h1>
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Transaction
        </button>
      </header>

      <section className="cards">
        <div className="card">
          <div className="card-label">All Transactions</div>
          <h2>{transactions.length}</h2>
          <span className="card-sub">Recorded activities</span>
        </div>

        <div className="card">
          <div className="card-label">Income</div>
          <h2>{formatMoney(income)}</h2>
          <span className="positive">Total received</span>
        </div>

        <div className="card">
          <div className="card-label">Expenses</div>
          <h2>{formatMoney(expenses)}</h2>
          <span className="negative">Total spent</span>
        </div>
      </section>

      <section className="panel transactions">
        <div className="panel-header">
          <div>
            <h3>All Transactions</h3>
            <p>View and manage your financial activity</p>
          </div>
        </div>

        <TransactionList />
      </section>
    </>
  );

  const renderAnalytics = () => (
    <>
      <header className="topbar">
        <div>
          <p className="welcome">Understand your spending</p>
          <h1>Analytics</h1>
        </div>
      </header>

      <section className="cards">
        <div className="card">
          <div className="card-label">Total Spending</div>
          <h2>{formatMoney(expenses)}</h2>
          <span className="negative">Across all categories</span>
        </div>

        <div className="card">
          <div className="card-label">Average Transaction</div>
          <h2>
            {formatMoney(
              expenses /
                Math.max(
                  transactions.filter((t) => t.type === "expense").length,
                  1
                )
            )}
          </h2>
          <span className="card-sub">Average expense</span>
        </div>

        <div className="card">
          <div className="card-label">Savings</div>
          <h2>{formatMoney(Math.max(balance, 0))}</h2>
          <span className="positive">Current savings</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Expense Breakdown</h3>
            <p>Where your money is going</p>
          </div>
        </div>

        <div className="analytics-list">
          {Object.keys(categoryTotals).length === 0 ? (
            <p className="empty">Add expenses to see analytics.</p>
          ) : (
            Object.entries(categoryTotals).map(([category, amount]) => (
              <div className="analytics-row" key={category}>
                <div className="analytics-name">
                  <strong>{category}</strong>
                  <span>{formatMoney(amount)}</span>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(amount / maxCategoryAmount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );

  const renderBudget = () => {
    const budget = 25000;
    const percentage = Math.min((expenses / budget) * 100, 100);
    const remaining = Math.max(budget - expenses, 0);

    return (
      <>
        <header className="topbar">
          <div>
            <p className="welcome">Plan your spending</p>
            <h1>Budget</h1>
          </div>
        </header>

        <section className="cards">
          <div className="card balance-card">
            <div className="card-label">Monthly Budget</div>
            <h2>{formatMoney(budget)}</h2>
            <span className="card-sub">Your spending limit</span>
          </div>

          <div className="card">
            <div className="card-label">Amount Spent</div>
            <h2>{formatMoney(expenses)}</h2>
            <span className="negative">
              {Math.round(percentage)}% used
            </span>
          </div>

          <div className="card">
            <div className="card-label">Remaining</div>
            <h2>{formatMoney(remaining)}</h2>
            <span className="positive">Available budget</span>
          </div>
        </section>

        <section className="panel budget-panel">
          <div className="panel-header">
            <div>
              <h3>Budget Progress</h3>
              <p>Monthly spending limit</p>
            </div>

            <span className="budget-percent">
              {Math.round(percentage)}%
            </span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="budget-info">
            <span>Spent: {formatMoney(expenses)}</span>
            <span>Remaining: {formatMoney(remaining)}</span>
          </div>

          <div className="budget-message">
            {percentage >= 90
              ? "⚠️ You are very close to your monthly budget."
              : percentage >= 70
              ? "⚠️ Keep an eye on your spending this month."
              : "✓ Your spending is currently within a healthy range."}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">₹</div>
          <span>FinTrack</span>
        </div>

        <nav>
          {["Dashboard", "Transactions", "Analytics", "Budget"].map(
            (item) => (
              <div
                key={item}
                className={`nav-item ${page === item ? "active" : ""}`}
                onClick={() => setPage(item)}
              >
                <span>
                  {item === "Dashboard"
                    ? "⌂"
                    : item === "Transactions"
                    ? "↕"
                    : item === "Analytics"
                    ? "◔"
                    : "◫"}
                </span>
                <span>{item}</span>
              </div>
            )
          )}
        </nav>

        <div className="sidebar-bottom">
          <p>Personal Finance</p>
          <small>Track. Save. Grow.</small>
        </div>
      </aside>

      <main className="main">
        {page === "Dashboard" && renderDashboard()}
        {page === "Transactions" && renderTransactions()}
        {page === "Analytics" && renderAnalytics()}
        {page === "Budget" && renderBudget()}
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Add Transaction</h2>
                <p>Record your income or expense</p>
              </div>

              <button onClick={() => setShowForm(false)}>×</button>
            </div>

            <form onSubmit={addTransaction}>
              <label>Transaction Name</label>

              <input
                type="text"
                placeholder="e.g. Grocery Shopping"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <label>Amount</label>

              <input
                type="number"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <label>Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option>Food</option>
                <option>Housing</option>
                <option>Bills</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>

              <label>Type</label>

              <div className="type-buttons">
                <button
                  type="button"
                  className={form.type === "expense" ? "selected" : ""}
                  onClick={() =>
                    setForm({ ...form, type: "expense" })
                  }
                >
                  Expense
                </button>

                <button
                  type="button"
                  className={
                    form.type === "income"
                      ? "selected income-select"
                      : ""
                  }
                  onClick={() =>
                    setForm({ ...form, type: "income" })
                  }
                >
                  Income
                </button>
              </div>

              <button className="submit-btn" type="submit">
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;