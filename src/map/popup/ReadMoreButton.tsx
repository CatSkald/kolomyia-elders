const ReadMoreButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <sup
      role="button"
      aria-label={text}
      onClick={onClick}
      style={{ color: "var(--color-link)" }}
    >
      {text}
    </sup>
  );
};

export default ReadMoreButton;
