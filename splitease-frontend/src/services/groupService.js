import axios from "axios";

export const createGroup = async (group) => {
  try {
    const res = await axios.post(
      "http://localhost:8081/api/group/create",
      group,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const listGroups = async (token) => {
  try {
    console.log("Token: ", token);
    const res = await axios.post(
      "http://localhost:8081/api/group/list",
      { userId: localStorage.getItem("userId") },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const fetchGroupDetail = async (token, groupId) => {
  try {
    const res = await axios.get(`http://localhost:8081/api/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const addMember = async (token,group)=>{
    try {
    const res = await axios.post(`http://localhost:8081/api/group/addmember`, group,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    return e.response;
  }
}
