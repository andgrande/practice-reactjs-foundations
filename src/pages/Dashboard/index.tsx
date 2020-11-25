/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer, Form } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface NewTrx {
  title: string;
  category: string;
  value: number;
  type: 'income' | 'outcome';
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [idToRemove, setIdToRemove] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number | string>(0);
  const [newCategory, setNewCategory] = useState<string>('');

  const [status, setStatus] = useState('');

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('/transactions');

      const formattedBalance = {
        income: formatValue(data.balance.income),
        outcome: formatValue(data.balance.outcome),
        total: formatValue(data.balance.total),
      };

      const formattedTransactions = [
        ...data.transactions.map((trx: Transaction) => {
          const formattedValue = formatValue(trx.value);
          return {
            id: trx.id,
            title: trx.title,
            value: trx.value,
            type: trx.type,
            category: {
              title: trx.category.title,
            },
            created_at: trx.created_at,
            formattedValue:
              trx.type === 'outcome' ? `- ${formattedValue}` : formattedValue,
            formattedDate: formatDate(trx.created_at),
          };
        }),
      ];

      const sortedTrx = [
        ...formattedTransactions.sort((a, b) => {
          // const dateA: Date = new Date(a.created_at);
          // const dateB: Date = new Date(b.created_at);
          const dateAMm = Date.parse(a.created_at);
          const dateBMm = Date.parse(b.created_at);

          return dateAMm - dateBMm;
        }),
      ];

      setBalance(formattedBalance);
      setTransactions([...sortedTrx]);
    }

    loadTransactions();
  }, [idToRemove, status]);

  async function handleRemoveTransaction(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);

    const updatedTransactions = [...transactions];
    const indexToBeRemoved = updatedTransactions.findIndex(
      trx => trx.id === idToRemove,
    );
    updatedTransactions.splice(indexToBeRemoved, 1);
    setTransactions([...updatedTransactions]);
    // needed a route for getBalance and then use this value on setBalance
    setIdToRemove(id);
  }

  async function handleAddNewTransaction(): Promise<void> {
    const value = Number(newPrice);
    const type = Math.sign(value) > 0 ? 'income' : 'outcome';

    const newTransaction: NewTrx = {
      title: newTitle,
      value: value < 0 ? value * -1 : value,
      type,
      category: newCategory,
    };

    const { data } = await api.post('transactions', newTransaction);

    data ? setStatus(data.id) : setStatus('');

    setNewTitle('');
    setNewPrice(0);
    setNewCategory('');
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Titulo"
                    alt="Título"
                    value={newTitle}
                    type="text"
                    onChange={e => setNewTitle(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    placeholder="Preço"
                    alt="Preço"
                    value={newPrice}
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    onChange={e => setNewPrice(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    placeholder="Categoria"
                    alt="categoria"
                    value={newCategory}
                    type="text"
                    onChange={e => setNewCategory(e.target.value)}
                  />
                  <IoMdAddCircle onClick={() => handleAddNewTransaction()} />
                </td>
                {/* <td>
                  <input
                    placeholder="Data"
                    alt="Data"
                    value={newDate}
                    type="date"
                    onChange={e => setNewDate(e.target.value)}
                  />

                </td> */}
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map(trx => (
                  <tr key={trx.id}>
                    <td className="title">{trx.title}</td>
                    <td className={trx.type}>{trx.formattedValue}</td>
                    <td>{trx.category.title}</td>
                    <td>
                      {trx.formattedDate}
                      <button
                        onClick={() => handleRemoveTransaction(trx.id)}
                        type="button"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
