import { Card } from 'antd';
import React from 'react';
import moment from 'moment';

const { Meta } = Card;
const BoardBox = (props) => {
  return (
    <Card
      hoverable
      onClick={() => console.log("Ok")}
      className="w-full"
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="h-32 w-auto mx-auto" draggable={false} />}
    >
      <Meta title={props.name} description={moment(props.createdAt).format("MMM DD, YYYY | hh:mm")} />
    </Card>
  )
}

export default BoardBox;