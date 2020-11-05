import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string,
  value: number,
  type: 'outcome' | 'income',
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(transction => transction.type === 'income').reduce( ( total, current ) =>  total + current.value, 0);
    const outcome = this.transactions.filter(transction => transction.type === 'outcome').reduce( ( total, current ) =>  total + current.value, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome

    }

    return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
