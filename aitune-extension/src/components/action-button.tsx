import ReactDOM from "react-dom";
import { useState } from "react";
const ActionButton = ({
  textarea,
  id,
}: {
  textarea: HTMLTextAreaElement;
  id: string;
}) => {
  const [prevState, setPrevState] = useState("");
  const correctGrammarFn = () => {
    const element = document.querySelector(
      `[data-id="${id}"]`
    ) as HTMLTextAreaElement;
    if (element) {
      setPrevState(element.value);
      element.value = "Hello";
    }
  };

  const undoActionFn = () => {
    const element = document.querySelector(
      `[data-id="${id}"]`
    ) as HTMLTextAreaElement;
    if (element) {
      element.value = prevState;
    }
  };

  return (
    <div>
      {ReactDOM.createPortal(
        <div className=" absolute right-0 bottom-0 inline-block ">
          <button
            className={""}
            onClick={undoActionFn}
            disabled={prevState.length > 0 ? false : true}
          >
            Undo
          </button>
          <button className={""} onClick={correctGrammarFn}>
            Grammar
          </button>
          <button className={""}>Grammar & Professional</button>
        </div>,
        textarea.parentElement!
      )}
    </div>
  );
};

export default ActionButton;
