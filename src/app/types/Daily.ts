export interface IDaily {
  date: string;
  day: { temperature: number; icon: string };
  night: { temperature: number; icon: string };
}
