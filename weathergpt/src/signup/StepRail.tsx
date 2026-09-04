import styles from './signup.module.css'

interface StepRailProps {
  step: number
  total: number
  label: string
}

export default function StepRail({ step, total, label }: StepRailProps) {
  return (
    <div>
      <p className={styles.railLabel}>{label}</p>
      <div className={styles.rail}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={styles.railStep} data-done={i < step} />
        ))}
      </div>
    </div>
  )
}
