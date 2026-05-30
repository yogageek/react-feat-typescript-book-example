import React from 'react';

const SayHello = (props) => (
  <div
    style={
      props.name === null ? { color: '#fff', background: '#000' } : {}// 如果 name 是 null，就设置黑底白字的样式，否则不设置任何样式, {} 是一个空对象，表示不设置任何样式
    }
  >
    {`Hello ${props.name === null ? 'noBody' : props.name}!`}
  </div>// 如果 name 是 null，就显示 noBody，否则显示 name 的值
);

export default SayHello;
