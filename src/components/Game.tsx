import React from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import type { GameData, Settings } from "../types";
import { defaultGameData, GAME_STATUS, TIMERS } from "../utils";
import GameStats from "./GameStats";
import Questions from "./Questions";
import RemainingTime from "./RemainingTime";

type Props = {
	user: string;
	settings: Settings;
	gameData: GameData;
	updateGameData: React.Dispatch<React.SetStateAction<GameData>>;
};

export default function Game({
	user,
	settings,
	gameData,
	updateGameData,
}: Props) {
	const changeStatus = (status: number) => () =>
		updateGameData((prev) => ({ ...prev, msgCode: undefined, status }));

	const startGame = () =>
		updateGameData(() => ({
			...defaultGameData,
			status: GAME_STATUS.STARTED,
		}));

	return (
		<div className="flex flex-col gap-6">
			{gameData.status === GAME_STATUS.NOT_STARTED ? (
				<div className="flex flex-col gap-2 py-4">
					<p>
						Hello <b>{user}</b>,
					</p>
					<p>Welcome to the Math Game!</p>
					<p className="mt-4">Press start when you're ready!</p>
				</div>
			) : gameData.status === GAME_STATUS.ENDED && gameData.elapsedTime ? (
				<GameStats user={user} gameData={gameData} settings={settings} />
			) : (
				<Questions
					key={gameData.count}
					settings={settings}
					gameData={gameData}
					updateGameData={updateGameData}
				/>
			)}
			<div className="flex justify-between">
				{settings.timer === TIMERS.SPEED_DRILL &&
					gameData.status !== GAME_STATUS.NOT_STARTED &&
					gameData.status !== GAME_STATUS.ENDED && (
						<div>
							<RemainingTime
								duration={settings.maxTime * 60000}
								gameData={gameData}
								onFinish={changeStatus(GAME_STATUS.ENDED)}
							/>
						</div>
					)}
				<div className="flex flex-1 justify-end gap-3">
					{(gameData.status === GAME_STATUS.NOT_STARTED ||
						gameData.status === GAME_STATUS.ENDED) && (
						<button
							type="button"
							className="flex items-center gap-1 text-green-600 hover:opacity-90"
							onClick={startGame}
						>
							<FaPlay />
							Start
						</button>
					)}
					{gameData.status !== GAME_STATUS.NOT_STARTED &&
						gameData.status !== GAME_STATUS.ENDED && (
							<>
								{gameData.status === GAME_STATUS.PAUSED ? (
									<button
										type="button"
										className="flex items-center gap-1 hover:opacity-90"
										onClick={changeStatus(GAME_STATUS.STARTED)}
									>
										<FaPlay />
										Resume
									</button>
								) : (
									<button
										type="button"
										className="flex items-center gap-1 hover:opacity-90"
										onClick={changeStatus(GAME_STATUS.PAUSED)}
									>
										<FaPause />
										Pause
									</button>
								)}
								<button
									type="button"
									className="flex items-center gap-1 hover:opacity-90"
									onClick={changeStatus(GAME_STATUS.ENDED)}
								>
									<FaStop />
									Stop
								</button>
							</>
						)}
				</div>
			</div>
		</div>
	);
}
