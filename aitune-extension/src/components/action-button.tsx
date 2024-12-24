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

  const addTempData = () => {
    const element = document.querySelector(
      `[data-id="${id}"]`
    ) as HTMLTextAreaElement;
    element.value = "";
    // add char by char to the textarea from teh testing data
    let index = 0;

    const addChar = () => {
      if (index < tempData.length) {
        element.value += tempData.charAt(index);
        index++;
        setTimeout(addChar, 1);
      }
    };

    addChar();
  };

  const correctGrammarFn = async () => {
    const element = document.querySelector(
      `[data-id="${id}"]`
    ) as HTMLTextAreaElement;
    setPrevState(element.value);
    const url = `http://localhost:8000/api/v1/ai/grammar-corrector`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: element.value,
        model: "llama3.2",
      }),
    });
    if (!response.body) {
      throw new Error("Failed to fetch data");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
      element.value = result;
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
            type="button"
          >
            Undo
          </button>
          <button type="button" className={""} onClick={correctGrammarFn}>
            Grammar
          </button>
          <button type="button" className={""}>
            Grammar & Professional
          </button>
          <button type="button" onClick={addTempData} className={""}>
            Add Temp Data
          </button>
        </div>,
        textarea.parentElement!
      )}
    </div>
  );
};

export default ActionButton;
const tempData = `
Hi John,

I'm XYZ, an experinced web devloper with 5 year of experiance. I specialze in front-end developmnt, React, and Javascript, and have worked on similer projects delivring high qualty resutls. I’d love to help with your webiste redesign and make sure its both user freindly and visually apeling.

Let’s discuus how I can contribute to your projct and deliever it on time. I’m looking forward to colaborate with you!

Best regards,
XYZ
Upwork Profile Link
Portfolio Link`;
