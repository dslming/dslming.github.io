import Experience from './components/Experience'
import Footer from './components/Footer'
import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <Experience />
      <Footer />
    </div>
  );
}
