import React from "react";
import { getTodo } from "../../Services/Todo/Index";

function TabContent({ todos, showDetailModal, setDetail, handleChecked, handleDelete }) {
  const handleDetail = async (id) => {
    try {
      const res = await getTodo(id);

      if (res.status == 200) {
        setDetail(res.data.todo);
        showDetailModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {todos.map((todo, index) => (
        <div key={todo.id} className="item">
          <div className="name">
            <div className="checkbox">
              <input
                type="checkbox"
                className="hidden"
                id={`task-${todo.id}`}
                defaultChecked={todo.status == true ? todo.status : false}
                onClick={(e) => handleChecked(todo.id, e.target.checked)}
              />
              <label htmlFor={`task-${todo.id}`} role="button">
                <svg xmlns="http://www.w3.org/2000/svg" className="line c-1" viewBox="0 0 24 24">
                  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" className="c-2" viewBox="0 0 24 24">
                  <path d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.626 7.293a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"></path>
                </svg>
              </label>
            </div>

            <span className="text">{todo.task}</span>
          </div>

          <div className="action">
            <div className="detail" role="button" aria-label="Detail task" onClick={() => handleDetail(todo.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="line" viewBox="0 0 24 24">
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              </svg>
            </div>

            <div className="delete" role="button" aria-label="Delete task" onClick={(e) => handleDelete(todo.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="line" viewBox="0 0 24 24">
                <path d="M4 7l16 0"></path>
                <path d="M10 11l0 6"></path>
                <path d="M14 11l0 6"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TabContent;
