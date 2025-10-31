import { CSSProperties } from "react";
import { mappedVocabulary } from "../utils";
import reactStringReplace from "react-string-replace";

const RichText = ({ data, style }: { data: string; style?: CSSProperties }) => {
  const wordFromVocabularyPattern: RegExp =
    /([\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]+\s?<\d+>)/gu;

  return reactStringReplace(data, wordFromVocabularyPattern, (match) => {
    const [word, definitionId] = match
      .replace(">", "")
      .split("<")
      .map((x) => x.trim());
    console.log(match, word, definitionId);
    const vocabularyWord = mappedVocabulary.find((x) => x.id === definitionId);
    return (
      <span
        style={style}
        {...(vocabularyWord
          ? { className: "has-tooltip", title: vocabularyWord.definition }
          : {})}
      >
        {word}
      </span>
    );
  });
};

export default RichText;
