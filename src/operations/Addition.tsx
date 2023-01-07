import { useMemo, useState } from "react";
import InputAnswer from "../components/InputAnswer";
import MissingAnswer from "../components/MissingAnswer";
import MultiChoiceAnswer from "../components/MultiChoiceAnswer";
import type { GameData, Settings } from "../types";
import {
	answerModes,
	randomAnswerGenerator,
	RandomItem,
	RandomNumber,
	Shuffle,
} from "../utils";

type Props = {
	settings: Settings;
	gameData: GameData;
	onComplete: (isCorrect: boolean, feedbackOnly?: boolean) => void;
};

export default function Addition({ settings, gameData, onComplete }: Props) {
	const [answerKey, setAnswerKey] = useState<number>();

	const checkAnswer = (answer: number) => (input: number) => {
		const isCorrect = input === answer;
		const attempts = gameData.attempts + 1;

		if (isCorrect || attempts < 2) {
			onComplete(isCorrect);
		} else {
			onComplete(isCorrect, true);
			setTimeout(() => setAnswerKey(answer), 1000);
			setTimeout(() => onComplete(isCorrect), 3000);
		}
	};

	const { num1, num2, answer, multiOptions, missingIndex } = useMemo(() => {
		const baseNum = RandomItem<number>(settings.baseNums);
		const maxNum = +RandomNumber(0, settings.maxNum["Addition"]);

		const [num1, num2] = Shuffle([baseNum, maxNum]) as number[];
		const answer = baseNum + maxNum;
		const multiOptions =
			settings.mode === answerModes.MULTICHOICE
				? randomAnswerGenerator(answer)
				: [];
		const missingIndex = RandomNumber(0, 2);

		setAnswerKey(undefined);

		return { num1, num2, answer, multiOptions, missingIndex };
	}, [settings, gameData.count]);

	if (settings.mode !== answerModes.MISSING) {
		return (
			<div className="flex w-auto items-center gap-4 text-2xl">
				<span>{num1}</span>
				<span>+</span>
				<span>{num2}</span>
				<span>=</span>
				{settings.mode === answerModes.USERINPUT ? (
					<InputAnswer value={answerKey} checkAnswer={checkAnswer(answer)} />
				) : (
					<MultiChoiceAnswer
						value={answerKey}
						options={multiOptions}
						checkAnswer={checkAnswer(answer)}
					/>
				)}
			</div>
		);
	} else {
		const eqParts = [num1, num2, answer];
		const missingNum = eqParts[missingIndex];

		return (
			<MissingAnswer
				missingIndex={missingIndex}
				eqParts={eqParts}
				opSymbol="+"
				value={answerKey}
				checkAnswer={checkAnswer(missingNum)}
			/>
		);
	}
}
