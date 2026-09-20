import { Search, Loader2 } from "lucide-react";
import "./VerificationForm.css";

export default function VerificationForm({
  value,
  onChange,
  onSubmit,
  status,
  errorMessage,
}) {
  const isLoading = status === "loading";

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="verify-form" onSubmit={handleSubmit}>
      <div className={`verify-form__box ${errorMessage ? "verify-form__box--error" : ""}`}>
        <input
          type="text"
          className="verify-form__input"
          placeholder="Paste an article headline to verify..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          aria-label="News headline"
        />
        <button
          type="submit"
          className="verify-form__btn"
          disabled={isLoading}
          aria-label="Verify"
        >
          {isLoading ? (
            <Loader2 size={18} className="verify-form__spin" />
          ) : (
            <>
              <span className="verify-form__btn-text">Verify</span>
              <Search size={16} className="verify-form__btn-icon" />
            </>
          )}
        </button>
      </div>

      {errorMessage && <p className="verify-form__error">{errorMessage}</p>}

      <p className="verify-form__hint">Because facts matter.</p>
    </form>
  );
}
