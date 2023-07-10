import React, { useState } from "react";
import TabContent from "./TabContent";

function Tab({ todos, showDetailModal, showEditModal, setDetail, handleChecked, handleDelete }) {
  const [active, setActive] = useState("all");

  return (
    <>
      <div className="tab">
        <div className={active == "all" ? "name active" : "name"} role="button" aria-label="All todo" onClick={() => setActive("all")}>
          All
        </div>

        <div className={active == "uncompleted" ? "name active" : "name"} role="button" aria-label="Uncompleted todo" onClick={() => setActive("uncompleted")}>
          Uncompleted
        </div>

        <div className={active == "completed" ? "name active" : "name"} role="button" aria-label="Completed todo" onClick={() => setActive("completed")}>
          Completed
        </div>
      </div>

      <div className="tab-content">
        {active == "all" && (
          <TabContent
            todos={todos}
            showDetailModal={showDetailModal}
            showEditModal={showEditModal}
            setDetail={setDetail}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
          />
        )}
        {active == "uncompleted" && (
          <TabContent
            todos={todos.filter((todo) => todo.status == false)}
            showDetailModal={showDetailModal}
            showEditModal={showEditModal}
            setDetail={setDetail}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
          />
        )}
        {active == "completed" && (
          <TabContent
            todos={todos.filter((todo) => todo.status == true)}
            showDetailModal={showDetailModal}
            showEditModal={showEditModal}
            setDetail={setDetail}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

export default Tab;
