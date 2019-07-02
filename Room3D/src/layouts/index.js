import styles from './index.less';

function BasicLayout(props) {
  return (
    <div className={styles.box}>
      {props.children}
    </div>
  );
}

export default BasicLayout;
