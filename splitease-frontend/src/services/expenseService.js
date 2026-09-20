import axios from "axios";
export const addExpense = async (expense, token) => {
  try {
    const res = await axios.post(
      `http://localhost:8081/api/expense/add`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const addSplit = async (split, token) => {
  try {
    const res = await axios.post(`http://localhost:8081/api/split/new`, split, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const updatePaid = async (splitId, token) => {
  try {
    console.log(splitId);
    console.log(token);
    const res = await axios.patch(
      `http://localhost:8081/api/split/paid/${splitId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};
