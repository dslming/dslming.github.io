import Experience from './components/Experience'
import Education from './components/Education'
import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <Experience />
      <Education />
    </div>
  );
}
