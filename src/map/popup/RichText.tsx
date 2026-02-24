import { CSSProperties } from "react";
import { mappedSources, mappedVocabulary } from "../../utils";
import reactStringReplace from "react-string-replace";
import { SourceEntry } from "../../types/types";
import Sources from "./Sources";

const RichText = ({ data, style }: { data: string; style?: CSSProperties }) => {
  const { sourcedText, sources } = parseSources(data);
  const text = sources ? sourcedText : data;

  const wordFromVocabularyPattern: RegExp =
    /([\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]+\s?<\d+>)/gu;

  return (
    <span style={style}>
      {reactStringReplace(text, wordFromVocabularyPattern, (match, index) => {
        const [word, definitionId] = match
          .replace(">", "")
          .split("<")
          .map((x) => x.trim());
        const vocabularyWord = mappedVocabulary.find(
          (x) => x.id === definitionId,
        );

        return (
          <span
            key={index}
            {...(vocabularyWord
              ? { className: "has-tooltip", title: vocabularyWord.definition }
              : {})}
          >
            {word}
          </span>
        );
      })}
      {sources && <Sources data={sources} />}
    </span>
  );
};

const parseSources = (
  text: string,
): {
  sourcedText: string | undefined;
  sources: SourceEntry[] | undefined;
} => {
  const sourceMarker = "[";
  const hasSources = text.indexOf(sourceMarker) !== -1;
  let sources = undefined;
  let sourcedText = undefined;

  if (hasSources) {
    const all = text.split("[");
    sourcedText = all[0].trim();
    sources = all[1]
      .slice(0, -1)
      .split(",")
      .map((x) => {
        const number = Number(x);
        return (
          mappedSources.find((s) => s.number === number) ??
          ({
            number: number,
            title: `Джерело №${number}`,
          } as SourceEntry)
        );
      });
  }

  return { sourcedText, sources };
};

export default RichText;
