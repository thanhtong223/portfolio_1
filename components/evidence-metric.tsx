type EvidenceMetricProps = {
  value: string;
  label: string;
  detail: string;
};

export function EvidenceMetric({ value, label, detail }: EvidenceMetricProps) {
  return (
    <article className="evidence-metric">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{detail}</p>
    </article>
  );
}
