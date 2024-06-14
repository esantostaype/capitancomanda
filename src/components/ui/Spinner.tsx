import styles from './Spinner.module.css'

export const Spinner = () => {
  return (
    <div className={ `${ styles.container }` }>
      <span className={ styles.content }></span>
    </div>
  )
}