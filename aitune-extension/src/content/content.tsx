import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ActionButton from "@/components/action-button";

const ContentPage = () => {
  const [textareaData, setTextareaData] = useState<
    { id: string; textarea: HTMLTextAreaElement }[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      const textareaElements = document.querySelectorAll("textarea");
      const newTextareaData = Array.from(textareaElements).map((textarea) => {
        const id = uuidv4();
        textarea.setAttribute("data-id", id);
        if (textarea.parentElement) {
          textarea.parentElement.style.position = "relative";
        }
        return { id, textarea };
      });
      setTextareaData(newTextareaData);
    }, 1000);
  }, []);

  console.log(`AI correction is active... `);
  return (
    <div>
      {textareaData.map(({ id, textarea }) => (
        <ActionButton key={id} textarea={textarea} id={id} />
      ))}
    </div>
  );
};

export default ContentPage;
