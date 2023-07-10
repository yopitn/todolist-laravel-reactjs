import React from "react";

function Form({ task, setTask, loading, errors, placeholder, handleSubmit }) {
  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <div className="field">
        <input type="text" name="task" id="task" value={task} placeholder={placeholder} autoComplete="off" onChange={(e) => setTask(e.target.value)} />
        <button type="submit" className="button" disabled={loading}>
          Add
        </button>
      </div>

      {errors.task && <span className="error">{errors.task}</span>}
    </form>
  );
}

export default Form;
