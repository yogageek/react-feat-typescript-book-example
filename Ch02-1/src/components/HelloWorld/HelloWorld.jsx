import React from 'react'; 
import styles from './index.scss';

const HelloWorld = () => ( // 这里的样式是通过 CSS Modules 引入的，编译后会被转换成一个独一无二的类名
  <div className={`${styles.nightMode} ${styles.title}`}>
    Hello world!
  </div>  
);

export default HelloWorld;
