import styles from './StatusPill.module.css'

interface StatusPillProps {
  label: string
  tone?: 'green' | 'amber' | 'red' | 'cyan'
}

export default function StatusPill({ label, tone = 'green' }: StatusPillProps) {
  return (
    <span className={styles.pill} data-tone={tone}>
      <span className={styles.dot} data-tone={tone} />
      {label}
    </span>
  )
}
