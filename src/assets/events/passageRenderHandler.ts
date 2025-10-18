import { DayTransition } from '../scripts/DayTransition';

const EVENTS: Record<string, () => void> = {
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
  Day1CasingFake: () => {
    DayTransition('Day1CasingFakeScreen', 'day-1-casing-fake');
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
  },
  Day2BackupFingerDead: () => {
    DayTransition('Day2BackupFingerDeadScreen', 'day-2-backup-finger-dead');
  },
  Day3BloodAlone: () => {
    DayTransition('Day3BloodAlone-0', 'day-3-blood-alone');
  },
  Day3BloodBackup: () => {
    DayTransition('Day3BloodBackup-0', 'day-3-blood-backup');
  },
  Day3FingerAlone: () => {
    DayTransition('Day3FingerAlone-0', 'day-3-finger-alone');
  },
  Day3FingerBackup: () => {
    DayTransition('Day3FingerBackup-0', 'day-3-finger-backup');
  },
  Day3BloodBackupBackup: () => {
    DayTransition('Day3BloodBackupBackup-0', 'day-3-blood-backup-backup');
  },
  Day3BloodBackupAlone: () => {
    DayTransition('Day3BloodBackupAlone-0', 'day-3-blood-backup-alone');
  },
};

const passageRenderHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageRenderHandler };
