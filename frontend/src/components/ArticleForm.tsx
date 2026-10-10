import { useState, type FormEvent } from "react";
import { ArrowRight, FileText, Loader2, X } from "lucide-react";
import { ARTICLE_INPUT_ID, MAX_ARTICLE_LENGTH, MIN_ARTICLE_LENGTH } from "../constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  loading: boolean;
}

/** Returns an inline validation message, or null when the input is valid. */
function validate(text: string, touched: boolean): string | null {
  const length = text.trim().length;
  if (text.length > MAX_ARTICLE_LENGTH) {
    return `Article is ${(text.length - MAX_ARTICLE_LENGTH).toLocaleString()} characters over the ${MAX_ARTICLE_LENGTH.toLocaleString()} limit.`;
  }
  if (length === 0) return touched ? "Paste an article to verify." : null;
  if (length < MIN_ARTICLE_LENGTH) {
    return `Article is too short. Add at least ${MIN_ARTICLE_LENGTH - length} more characters (minimum ${MIN_ARTICLE_LENGTH}).`;
  }
  return null;
}

export default function ArticleForm({ value, onChange, onSubmit, onClear, loading }: Props) {
  const [touched, setTouched] = useState(false);

  const message = validate(value, touched);
  const isValid = value.trim().length >= MIN_ARTICLE_LENGTH && value.length <= MAX_ARTICLE_LENGTH;
  const overLimit = value.length > MAX_ARTICLE_LENGTH;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid && !loading) onSubmit();
  };

  const handleClear = () => {
    setTouched(false);
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-ink bg-paper" aria-busy={loading}>
      <label htmlFor={ARTICLE_INPUT_ID} className="sr-only">
        News article text
      </label>
      <div className="flex gap-3 px-4 pt-4">
        <FileText size={18} className="mt-0.5 shrink-0 text-mute" aria-hidden="true" />
        <textarea
          id={ARTICLE_INPUT_ID}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          readOnly={loading}
          rows={7}
          placeholder="Paste a news article to verify..."
          aria-invalid={message !== null}
          aria-describedby="article-help"
          className="min-h-[10rem] w-full resize-y bg-transparent text-[15px] leading-relaxed placeholder:text-mute/70 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
        <div id="article-help" className="min-w-0 flex-1">
          <p
            className={`font-mono text-xs ${overLimit ? "text-bad-fg" : "text-mute"}`}
            aria-label={`${value.length} of ${MAX_ARTICLE_LENGTH} characters`}
          >
            {value.length.toLocaleString()} / {MAX_ARTICLE_LENGTH.toLocaleString()}
          </p>
          <p role={message ? "alert" : undefined} className="mt-1 min-h-[1rem] text-xs text-bad-fg">
            {message}
          </p>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={handleClear}
            disabled={loading || value.length === 0}
            className="btn-ghost"
          >
            <X size={14} aria-hidden="true" /> Clear
          </button>
          <button
            type="submit"
            disabled={!isValid || loading}
            className="btn-primary flex-1 sm:flex-none"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Verifying
              </>
            ) : (
              <>
                Verify Article <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
