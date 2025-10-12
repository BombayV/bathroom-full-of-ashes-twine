import { InitMainMenu } from '../scripts/MainMenu';
import { InitStart } from '../scripts/Start';

const EVENTS: Record<string, () => void> = {
  Start: () => {
    InitStart();
  },
  MainMenu: () => {
    InitMainMenu();
  },
};

const passageRenderHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageRenderHandler };
