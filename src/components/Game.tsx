import React from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { GameData, Settings } from "../types";
import { GAME_STATUS } from "../utils";
import Feedback from "./Feedback";
import Questions from "./Questions";

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
		updateGameData((prev) => ({ ...prev, status }));

	return (
		<>
			{/* {gameData.status !== GAME_STATUS.NOT_STARTED && (
				<>
					<div className="absolute top-3 right-2 flex gap-3 text-white">
						{""}
						<span>
							Your Score: {gameData.score} (
							{gameData.score
								? (
										(gameData.score / ((gameData.count - 1) * 10)) *
										100
								  ).toFixed(1)
								: 0}
							%)
						</span>
					</div>
					<Feedback key={Math.random()} isCorrect={gameData.isCorrect} />
				</>
			)} */}
			<div className="flex flex-col gap-6">
				{gameData.status === GAME_STATUS.NOT_STARTED ? (
					<div className="">
						Hello {user},<br />
						Welcome to the Math Game!
					</div>
				) : gameData.status === GAME_STATUS.ENDED ? (
					<p>Stats</p>
				) : (
					<Questions
						settings={settings}
						gameData={gameData}
						updateGameData={updateGameData}
					/>
				)}
				<div className="flex justify-end gap-3">
					{(gameData.status === GAME_STATUS.NOT_STARTED ||
						gameData.status === GAME_STATUS.ENDED) && (
						<button
							type="button"
							className="flex items-center gap-1 text-green-600 hover:opacity-90"
							onClick={changeStatus(GAME_STATUS.STARTED)}
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
		</>
	);
}
