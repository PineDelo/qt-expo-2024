import dayjs from 'dayjs';
import * as rdd from 'react-device-detect';

export const currentTime = () => {
  const unix = dayjs().unix();
  const t = dayjs(unix * 1000).format('HH:mm');
  return t;
};

export const isMobile = rdd.isMobile;
