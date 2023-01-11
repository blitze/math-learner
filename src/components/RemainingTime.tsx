import { useState } from "react";
import Timecode from "react-timecode";
import { GameData } from "../types";
import useGameTimer from "../hooks";

type Props = {
	gameData: GameData;
	duration: number; // milliseconds
	onFinish: () => void;
};

export default function RemainingTime({ gameData, duration, onFinish }: Props) {
	const [time, setTime] = useState(duration);

	useGameTimer({
		gameData,
		callback: (timer) => {
			if (time < 1) {
				onFinish();
			} else {
				setTime(duration - timer.getElapsedRunningTime());
			}
		},
	});

	return <Timecode time={time} />;
}
