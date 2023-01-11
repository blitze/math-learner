import { useState } from "react";
import Timecode from "react-timecode";
import { GameData } from "../types";
import useGameTimer from "../hooks";

type Props = {
	gameData: GameData;
	onStop?: (ellapsedTime: number) => void;
};

export default function SessionTimer({ gameData, onStop }: Props) {
	const [time, setTime] = useState(0);

	useGameTimer({
		gameData,
		onStop,
		callback: (timer) => setTime(timer.getElapsedRunningTime()),
	});

	return <Timecode time={time} />;
}
