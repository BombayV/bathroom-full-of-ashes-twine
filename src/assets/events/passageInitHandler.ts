const EVENTS: Record<string, () => void> = {
  Start: () => {},
  MainMenu: () => {},
};

const passageInitHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageInitHandler };
