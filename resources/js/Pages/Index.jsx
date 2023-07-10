import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../Services/Todo/Index";
import Form from "../Components/Todo/Form";
import Tab from "../Components/Todo/Tab";
import Modal from "../Components/Todo/Modal";
import datetimeConvert from "../Utils/datetimeConvert";

function Index() {
  const [todos, setTodos] = useState([]);
  const [detail, setDetail] = useState({});

  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await addTodo({ task: task, status: false });

      if (res.status == 200) {
        const todo = res.data.todo;
        const newTodos = todos;
        newTodos.unshift(todo);
        setTodos(newTodos);
        setTask("");
        setLoading(false);
      }
    } catch (error) {
      setErrors(error?.response?.data.errors.message);
      setTask("");
      setLoading(false);
    }
  };

  const handleChecked = async (id, status) => {
    try {
      const res = await updateTodo(id, { status: status });

      if (res.status == 200) {
        const index = todos.findIndex((todo) => todo.id == id);
        const todo = res.data.todo;

        const newTodo = todos[index];
        newTodo.status = todo.status;

        const newTodos = todos;
        newTodos.splice(index, 1, newTodo);

        setTodos(newTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);

      if (res.status == 204) {
        const index = todos.findIndex((todo) => todo.id == id);

        const newTodos = todos.filter((_, i) => i !== index);

        setTodos(newTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTodos();

        setTodos(data.todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <Head title="Todo | Banba" />

      <div className="main-wrap">
        <div className="container">
          <div className="main-content">
            <Form
              task={task}
              setTask={(state) => setTask(state)}
              loading={loading}
              errors={errors}
              placeholder="Add todo task..."
              handleSubmit={handleSubmit}
            />
            <Tab
              showDetailModal={(state) => setShowDetailModal(state)}
              showEditModal={(state) => setShowEditModal(state)}
              todos={todos}
              setDetail={(state) => setDetail(state)}
              handleChecked={handleChecked}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {showDetailModal && (
        <Modal title="Task" footer={false} showModal={(state) => setShowDetailModal(state)}>
          <div className="task">
            <div className="text">{detail.task}</div>
          </div>

          <div className="date">
            <div>
              Created at: <i>{datetimeConvert(detail.created_at)}</i>
            </div>
            <div>
              Updated at: <i>{datetimeConvert(detail.updated_at)}</i>
            </div>
          </div>

          <div className="status">
            Status: <i>{detail.status == true ? "Completed" : "Uncompleted"}</i>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Index;
