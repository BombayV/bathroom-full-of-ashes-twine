import { setupCounter } from '../scripts/counter';

const EVENTS: Record<string, () => void> = {
  Loading: () => {},
};

const passageInitHandler = (e: any) => {
  console.log('Passage initialized:', e);
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageInitHandler };
