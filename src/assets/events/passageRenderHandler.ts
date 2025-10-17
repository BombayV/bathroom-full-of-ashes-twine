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
  Day1DeadCasing: () => {
    DayTransition('Day1DeadScreenCasing', 'day-1-dead-casing');
  },
  Day2AloneFinger: () => {
    DayTransition('Day2AloneFingerStory', 'day-2-alone-finger');
  },
  Day2BackupFinger: () => {
    DayTransition('Day2BackupFingerStory', 'day-2-backup-finger');
  },
  Day2AloneBlood: () => {
    DayTransition('Day2AloneBloodStory', 'day-2-alone-blood');
  },
  Day2BackupBlood: () => {
    DayTransition('Day2BackupBloodStory', 'day-2-backup-blood');
  },
  Day2Casing: () => {
    DayTransition('Day2CasingStory', 'day-2-casing');
  }
};

const passageRenderHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageRenderHandler };
