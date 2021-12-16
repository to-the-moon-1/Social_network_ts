import React from 'react';

type PropsType = {
    message: string,
}

const Message: React.FC<PropsType> = (props) => {
    return <div className="text">{props.message}</div>
}

export default Message;
