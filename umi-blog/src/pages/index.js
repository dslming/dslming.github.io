import Header from './components/header'
import Main from './components/Main'
import Experience from './components/Experience'
import Education from './components/Education'
import styles from './index.less';


export default function() {
  return (
    <div className={styles.normal}>
      <Header />
      <Main />
      <Experience />
      <Education />
    </div>
  );
}
