import { Rate } from "antd";

export default function StarsDisplay({ stars, ...rest }) {
  let list = [];

  for (let i = 0; i < stars; i++) {
    list.push(i);
  }
  return stars > 0 ? (
    <span {...rest}>
      <Rate className='star-icon' allowHalf disabled value={stars} />
    </span>
  ) : null;
}
