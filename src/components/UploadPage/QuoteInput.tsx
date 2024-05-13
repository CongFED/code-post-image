import React from "react";
import "../../styles/css/upload_page/quote_input.css";

interface IQuoteInputProps {
  setQuote: (value: string) => void;
  quote: string;
}

const QuoteInput = ({ setQuote, quote }: IQuoteInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const quoteInput = e.target.value;
    setQuote(quoteInput);
  };

  return (
    <div className="mb-3 quote-input">
      <label className="form-label">Quote</label>
      <textarea
        className="form-control"
        rows={3}
        onChange={handleOnChange}
        value={quote}
      />
    </div>
  );
};

export default QuoteInput;
