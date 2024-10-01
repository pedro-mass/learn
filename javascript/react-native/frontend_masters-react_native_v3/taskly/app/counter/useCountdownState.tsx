import { useState, useEffect } from "react";
import { getFromStorage } from "../../utils/storage";

export const countdownStorageKey = "taskly-countdown";

export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  complatedAtTimestamps: number[];
};

export const useCountdownState = () => {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  return [countdownState, setCountdownState] as const;
};
