import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import type {
	GameData,
	Settings,
	StoredGameStats,
	StoredUserStats,
} from "../types";
import SessionStats from "./SessionStats";

type Props = {
	user: string;
	gameData: GameData;
	settings: Settings;
};

function GameStats({ user, gameData, settings }: Props) {
	const [, setStoredUserStats] = useLocalStorage<StoredUserStats>(user, {});
	const { mode, timer, maxTime } = settings;
	const { count, attempted, score, mostInARow, elapsedTime, bonus, stats } =
		gameData;

	useEffect(() => {
		const day = new Date().toLocaleDateString();
		const statData: StoredGameStats = {
			mode,
			timer,
			maxTime,
			count,
			attempted,
			score,
			mostInARow,
			elapsedTime,
			bonus,
			stats,
			timestamp: +new Date(),
		};

		setStoredUserStats((prev) => ({
			...prev,
			[day]: [...(prev[day] || []), statData],
		}));
	}, [
		mode,
		timer,
		maxTime,
		count,
		attempted,
		score,
		mostInARow,
		elapsedTime,
		bonus,
		stats,
		setStoredUserStats,
	]);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-center text-lg font-bold">Game Stats</h1>
			<SessionStats
				count={count}
				attempted={attempted}
				score={score}
				mostInARow={mostInARow}
				elapsedTime={elapsedTime}
				bonus={bonus}
				stats={stats}
				mode={mode}
				timer={timer}
				maxTime={maxTime}
			/>
		</div>
	);
}

export default GameStats;
