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
};

const passageRenderHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageRenderHandler };
