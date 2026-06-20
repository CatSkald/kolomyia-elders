const ReadMoreButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      aria-label={text}
      onClick={onClick}
      style={{
        color: "var(--color-link)",
        verticalAlign: "super",
        fontSize: "smaller",
      }}
    >
      {text}
    </button>
  );
};

export default ReadMoreButton;
