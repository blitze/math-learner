import React, { useState } from "react";
import type { GameData, Settings } from "../types";
import * as Operations from "../operations";
import {
	answerModes,
	GAME_STATUS,
	POINTS_PER_QUESTION,
	RandomItem,
	TIMERS,
	updateStats,
} from "../utils";
import RemainingTime from "./RemainingTime";
import InputAnswer from "./InputAnswer";
import MissingAnswer from "./MissingAnswer";
import MultiChoiceAnswer from "./MultiChoiceAnswer";

type Props = {
	settings: Settings;
	gameData: GameData;
	updateGameData: React.Dispatch<React.SetStateAction<GameData>>;
};

function Questions({ settings, gameData, updateGameData }: Props) {
	const [answerKey, setAnswerKey] = useState<number>();

	const operation = RandomItem(settings.operations) as string;
	const {
		num1,
		num2,
		answer,
		baseNum,
		multiOptions,
		missingIndex,
		op,
		opSymbol,
	} = Operations[operation as keyof typeof Operations](settings);

	const nextQuestion = (
		isCorrect: boolean,
		userAttempted: boolean,
		feedbackOnly: boolean = false,
		timeOutCode: number | undefined = undefined
	) => {
		updateGameData((prev) => {
			if (feedbackOnly) {
				return { ...prev, msgCode: 1 };
			}

			let points = 0;
			let {
				count,
				attempted,
				attempts,
				score,
				msgCode,
				inARow,
				mostInARow,
				bonus,
				stats,
				status,
			} = prev;

			attempts++;

			if (isCorrect || attempts > 1) {
				if (isCorrect) {
					points = POINTS_PER_QUESTION / attempts;

					if (attempts === 1) {
						inARow++;

						if (inARow > mostInARow) {
							mostInARow = inARow;
						}

						// exponentially add bonus points for every 5 in a row
						if (inARow % 5 === 0) {
							bonus += Math.floor(inARow / 5) * 50;
						}
					} else {
						inARow = 0;
					}
				} else {
					inARow = 0;
				}

				attempts = 0;
				attempted += +userAttempted;
				count++;
			}

			setAnswerKey(undefined);

			const problem = `${num1} ${opSymbol} ${num2} = ${answer}`;
			stats = updateStats(stats, op, problem, baseNum, isCorrect);
			score += points;
			msgCode = timeOutCode || points + attempts;

			return {
				...prev,
				attempts,
				count,
				attempted,
				score,
				inARow,
				mostInARow,
				bonus,
				msgCode,
				stats,
				status:
					settings.maxQuestions && count === settings.maxQuestions
						? GAME_STATUS.ENDED
						: status,
			};
		});
	};

	const onTimeRunOut = () => nextQuestion(false, false, false, -1);

	const checkAnswer = (answer: number) => (input: number) => {
		const isCorrect = input === answer;
		const attempts = gameData.attempts + 1;

		if (isCorrect || attempts < 2) {
			nextQuestion(isCorrect, !!input);
		} else {
			nextQuestion(isCorrect, !!input, true);
			setTimeout(() => setAnswerKey(answer), 1000);
			setTimeout(() => nextQuestion(isCorrect, !!input), 3000);
		}
	};

	const eqParts = [num1, num2, answer];
	const missingNum = eqParts[missingIndex];

	return (
		<div className="mx-auto flex w-auto flex-col gap-2">
			<h1 className="flex justify-between text-sm font-bold text-cyan-500">
				{`Question ${gameData.count + 1}${
					settings.maxQuestions ? " of " + settings.maxQuestions : ""
				}`}
				{settings.timer === TIMERS.FLASH_DRILL && (
					<RemainingTime
						key={gameData.count}
						duration={settings.maxTime * 1000}
						gameData={gameData}
						onFinish={onTimeRunOut}
					/>
				)}
			</h1>
			<div className="rounded-md border py-6 px-8 shadow-md">
				<div className="relative">
					{gameData.status === GAME_STATUS.PAUSED && (
						<div className="absolute top-0 bottom-0 left-0 right-0"></div>
					)}
					{settings.mode !== answerModes.MISSING ? (
						<div className="flex w-auto items-center gap-4 text-2xl">
							<span>{num1}</span>
							{opSymbol}
							<span>{num2}</span>
							<span>=</span>
							{settings.mode === answerModes.USERINPUT ? (
								<InputAnswer
									value={answerKey}
									checkAnswer={checkAnswer(answer)}
								/>
							) : (
								<MultiChoiceAnswer
									value={answerKey}
									options={multiOptions}
									checkAnswer={checkAnswer(answer)}
								/>
							)}
						</div>
					) : (
						<MissingAnswer
							missingIndex={missingIndex}
							eqParts={eqParts}
							opSymbol={opSymbol}
							value={answerKey}
							checkAnswer={checkAnswer(missingNum)}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Questions;
