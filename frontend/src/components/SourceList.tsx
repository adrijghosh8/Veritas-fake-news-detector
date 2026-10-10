import { ExternalLink } from "lucide-react";

interface Props {
  title: string;
  sources: string[];
  emptyText: string;
}

/** Only http(s) URLs become links; anything else is shown as plain text. */
function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

export default function SourceList({ title, sources, emptyText }: Props) {
  return (
    <div>
      <h4 className="text-sm font-bold">
        {title}
        {sources.length > 0 && <span className="ml-1.5 font-mono font-normal text-mute">({sources.length})</span>}
      </h4>
      {sources.length === 0 ? (
        <p className="mt-2 text-sm text-mute">{emptyText}</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {sources.map((url, i) => (
            <li key={`${url}-${i}`} className="flex items-start gap-2 text-sm">
              <ExternalLink size={13} className="mt-1 shrink-0 text-mute" aria-hidden="true" />
              {isSafeUrl(url) ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-mono text-xs leading-5 underline decoration-line underline-offset-2 hover:decoration-ink"
                >
                  {url}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="break-all font-mono text-xs leading-5 text-mute">{url}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
