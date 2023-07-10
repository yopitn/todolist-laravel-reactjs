import axios from "axios";

const URI = "http://127.0.0.1:8000/api/todos";

export function getTodos() {
  return axios.get(URI);
}

export function getTodo(id) {
  return axios.get(URI + "/" + id);
}

export function addTodo(data) {
  return axios.post(URI + "/create", data);
}

export function updateTodo(id, data) {
  return axios.put(URI + "/update/" + id, data);
}

export function deleteTodo(id) {
  return axios.delete(URI + "/delete/" + id);
}
