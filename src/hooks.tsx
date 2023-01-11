import { useEffect } from "react";
import { type Timer, useTimer } from "react-use-precision-timer";
import type { GameData } from "./types";
import { GAME_STATUS } from "./utils";

type Props = {
	gameData: GameData;
	callback: (timer: Timer) => void;
	onStop?: (ellapsedTime: number) => void;
};

export default function useGameTimer({ gameData, callback, onStop }: Props) {
	const timer = useTimer({ delay: 1000, fireImmediately: true }, () =>
		callback(timer)
	);

	useEffect(() => {
		if (gameData.status === GAME_STATUS.STARTED && !timer.isStarted()) {
			timer.start();
		} else if (gameData.status === GAME_STATUS.PAUSED && !timer.isPaused()) {
			timer.pause();
		} else if (gameData.status === GAME_STATUS.STARTED) {
			timer.resume();
		} else if (gameData.status === GAME_STATUS.ENDED) {
			// END GAME
			onStop && onStop(timer.getElapsedRunningTime());
			timer.stop();
		}
	}, [gameData.status, timer, onStop]);

	return timer;
}
