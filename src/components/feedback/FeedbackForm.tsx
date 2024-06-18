import { FormEvent, useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type feedbackFormProps = {
  onAddToList: (text: string) => void;
}

export default function FeedbackForm({ onAddToList }: feedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setText(newText);
    }
    return;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (text.includes("#") && text.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
      return;
    }
    onAddToList(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className={`form ${showValidIndicator ? 'form--valid' : ''} 
    ${showInvalidIndicator ? 'form--invalid' : ''}`}>
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}