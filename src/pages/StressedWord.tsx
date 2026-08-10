import type { ReactNode } from "react";
import styles from "./Page.module.css";

const COMBINING_ACUTE = "\u0301";

// Vowels that already carry a mark above; 
// the accent must sit higher to avoid collision.
const MARKED_ABOVE = new Set(["і", "ї", "й"]);

// Renders a word with stress mark (base vowel + U+0301) via CSS 
// instead of relying on the font's combining-mark support.
export const StressedWord = ({ text }: { text: string }) => {
  const chars = [...text];
  const nodes: ReactNode[] = [];
  let buffer = "";

  const flush = () => {
    if (buffer) {
      nodes.push(buffer);
      buffer = "";
    }
  };

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === COMBINING_ACUTE) continue;
    if (chars[i + 1] === COMBINING_ACUTE) {
      flush();
      const className = MARKED_ABOVE.has(chars[i])
        ? `${styles.stressed} ${styles.markedAbove}`
        : styles.stressed;
      nodes.push(
        <span key={i} className={className}>
          {chars[i]}
        </span>,
      );
    } else {
      buffer += chars[i];
    }
  }
  flush();

  return <>{nodes}</>;
};
