const { createTransaction, getTransactions, getTransactionById } = require('../services/transactionService');
const transactionValidation = require('../validations/transactionValidation');

const transferMoney = async (req, res) => {
  try {
    const { error } = transactionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await getTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionDetails = async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.transactionId);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { transferMoney, getAllTransactions, getTransactionDetails };
