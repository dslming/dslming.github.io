import style from '../index.less';

function Header(props) {
  return (
    <div className={style.header}>
      <h3>廉明 <span> WebGL工程师 </span></h3>
      <ul>
          <li><img src={require('../../../assets/phone.png')} alt=""/> 15127004511</li>
          <li><img src={require('../../../assets/email.png')} alt=""/> 1097364388@qq.com</li>
      </ul>
    </div>
  );
}


export default Header
