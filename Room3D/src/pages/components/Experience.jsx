import style from '../index.less';

function Experience(props) {
  return (
    <div className={style.experience}>
      <h4>项目主页</h4>
      <div className={style.enterprise}>
        <p className={style.time_now}>2019/7/1 19:48:55</p>
        <div className={style.detail}>
            <div className={style.desc}>
                <p><a href="https://dslming.github.io/ThreejsLearning/007-ff91/index.html"> FF91 汽车</a></p>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
        
        <p className={style.time}>2019/7/1</p>
        <div className={style.detail}>
            <div className={style.desc}>
                <p><a href="https://dslming.github.io/ThreejsLearning/012-CSS3DObject/index.html">空间卡片</a></p>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}


export default Experience
