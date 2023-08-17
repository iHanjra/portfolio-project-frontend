import Axios from "./Axios";

async function createShirt(data) {
  try {
    let result = await Axios.post(`/shirts`, data);
    return result;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

async function handleDeleteById(id) {
  try {
    let result = await Axios.delete(`/shirts/${id}`);
    alert("Successfully deleted!");
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getAllShirts() {
  try {
    let result = await Axios.get("/shirts");

    return result;
  } catch (e) {
    return e;
  }
};

async function updateShirtById(id, data) {
  try {
    let result = await Axios.put(`/shirts/${id}`, data);
    return result;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

export { createShirt, getAllShirts, updateShirtById, handleDeleteById };
