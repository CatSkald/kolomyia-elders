const ReadMoreButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <sup role="button" onClick={onClick} style={{ color: "var(--color-link)" }}>
      {text}
    </sup>
  );
};

export default ReadMoreButton;
