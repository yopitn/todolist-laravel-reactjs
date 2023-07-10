import React from "react";

function Modal({ children, title, footer, cancel, submit, showModal }) {
  return (
    <>
      <div className="modal">
        <div className="container">
          <div className="inner">
            <div className="header">
              {title && <div className="title">{title}</div>}

              <div className="close" role="button" aria-label="Close modal" onClick={() => showModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="line" viewBox="0 0 24 24">
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </div>
            </div>

            <div className="content">{children}</div>

            {footer && (
              <div className="footer">
                <div className={"submit button " + cancel.color} role="button" aria-label="Cancel modal" onClick={() => showModal(false)}>
                  {cancel.text}
                </div>

                <div className={"submit button " + submit.color} role="button" aria-label="Submit modal">
                  {submit.text}
                </div>
              </div>
            )}
          </div>

          <div className="overlay" onClick={() => showModal(false)}></div>
        </div>
      </div>
    </>
  );
}

export default Modal;
