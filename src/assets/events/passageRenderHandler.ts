import { DayTransition } from '../scripts/DayTransition';
import { InitMainMenu } from '../scripts/MainMenu';
import { InitStart } from '../scripts/Start';

const EVENTS: Record<string, () => void> = {
  Start: () => {
    InitStart();
  },
  MainMenu: () => {
    InitMainMenu();
  },
  Day0: () => {
    DayTransition('KitchenDay0', 'day-0');
  },
  Day0ChangeScene: () => {
    DayTransition('HouseDay0-0', 'day-0-change');
  },
  Day0EnterHouse: () => {
    DayTransition('InsideHouseDay0-0', 'day-0-enter');
  },
  Day0Dead: () => {
    DayTransition('Day0DeadScreen', 'day-0-dead');
  },
  Day1: () => {
    DayTransition('Day1Bathroom', 'day-1');
  },
  Day1Dead: () => {
    DayTransition('Day1DeadScreen', 'day-1-dead');
  },
  Day2Alone: () => {
    DayTransition('Day2Alone', 'day-2-alone');
  },
  Day2Backup: () => {
    DayTransition('Day2Backup', 'day-2-backup');
  },
};

const passageRenderHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageRenderHandler };
