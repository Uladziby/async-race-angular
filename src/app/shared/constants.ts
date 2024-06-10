export const DISTANCE = 500000;

export const LIMIT_ITEMS = 7;

export const getSpeed = (velocity: number) => DISTANCE / velocity;

export const calculateWinnerTime = (velocity: number) => {
  const time = (DISTANCE / (velocity! * 1000)).toFixed(2);

  return `${time}s`;
};

export const COLORS = {
  base: '#783dd0',
};

export const parseWinnerTimeToNumber = (time: string) => {
  return parseFloat(time.split('s')[0]);
};

export const parseTimeToString = (time: number) => {
  console.log(time, 'time');
  return `${time.toFixed(2)}s`;
};

export const aboutMe = new Map<string, string>([
  ['Github', 'https://github.com/uladziby'],
  ['Mail', 'yanushevskyv@gmail.com'],
  ['Task Repo', 'https://github.com/uladziby'],
]);
