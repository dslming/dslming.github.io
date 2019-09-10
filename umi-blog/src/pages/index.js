import Experience from './components/Experience'
import Footer from './components/Footer'
import Back from './components/Back'
import styles from './index.less';

export default function () {
  return (
    <div className={styles.normal}>
      <Back />
      <Experience />
      {/* <Footer /> */}
    </div>
  );
}
