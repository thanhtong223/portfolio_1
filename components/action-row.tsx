type ActionRowProps = {
  label: string;
  action: string;
};

export function ActionRow({ label, action }: ActionRowProps) {
  return (
    <div className="action-row">
      <span>{label}</span>
      <code>{action}</code>
    </div>
  );
}
