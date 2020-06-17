import moment from 'moment';

export function isSameMonth(time: number, month: number): boolean {
  const date = moment(Number(time));
  const result = date.isValid ? date.month() === Number(month) : false;
  return result;
}
