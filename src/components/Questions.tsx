import React from "react";
import type { GameData, Settings } from "../types";
import * as Operations from "../operations";
import { defaultGameData, GAME_STATUS } from "../utils";

type Props = {
	settings: Settings;
	gameData: GameData;
	updateGameData: React.Dispatch<React.SetStateAction<GameData>>;
};

function Questions({ settings, gameData, updateGameData }: Props) {
	const ops = "Addition"; // RandomItem(settings.operations) as string;
	const Component = Operations[ops];

	const onComplete = (
		inputIsCorrect: boolean,
		feedbackOnly: boolean = false
	) => {
		updateGameData((prev) => {
			if (feedbackOnly) {
				return { ...prev, isCorrect: inputIsCorrect };
			}

			let { count, attempts, score } = prev;

			attempts++;

			if (inputIsCorrect || attempts > 1) {
				score += inputIsCorrect ? 10 / attempts : 0;

				// isCorrect = undefined;
				attempts = 0;
				count++;
			}

			if (settings.maxQuestions && count > settings.maxQuestions) {
				return { ...defaultGameData, status: GAME_STATUS.ENDED };
			}

			return {
				...prev,
				count,
				attempts,
				score,
				isCorrect: inputIsCorrect,
			};
		});
	};

	return (
		Component && (
			<div className="mx-auto flex w-auto flex-col gap-2">
				<h1 className="text-sm font-bold text-cyan-500">
					{`Question ${gameData.count}${
						settings.maxQuestions ? " of " + settings.maxQuestions : ""
					}`}
				</h1>
				<div className="rounded-md border py-6 px-8 shadow-md">
					<Component
						settings={settings}
						gameData={gameData}
						onComplete={onComplete}
					/>
				</div>
			</div>
		)
	);
}

export default Questions;
