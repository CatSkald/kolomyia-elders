import { SourceProfile } from "../types/types";

const Sources = ({ data }: { data: SourceProfile[] }) => {
  return (
    <sup className="has-tooltip" title={data.map((s) => s.title).join("; ")}>
      {data.map((s) => s.number).join(",")}
    </sup>
  );
};

export default Sources;
