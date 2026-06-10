type StackGroupProps = {
  group: {
    title: string;
    items: {
      label: string;
      mark: string;
      tone: string;
      logo?: string;
    }[];
  };
};

export function StackGroup({ group }: StackGroupProps) {
  return (
    <article className="stack-group">
      <h3>{group.title}</h3>
      <ul>
        {group.items.map((item) => (
          <li key={item.label}>
            <span
              className={`tool-mark ${item.logo ? "tool-mark-logo" : `tool-mark-${item.tone}`}`}
              aria-hidden="true"
            >
              {item.logo ? <img src={item.logo} alt="" /> : item.mark}
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
