import React from "react";
import { evaluate, RandomNumber, Shuffle } from "../utils";

type Props = {
	mode: string;
	baseNum: number;
	maxNum: number;
	answer: number;
	checkAnswer: (answer: number) => void;
};

function MultipleChoiceAnswer({
	mode,
	baseNum,
	maxNum,
	answer,
	checkAnswer,
}: Props) {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		checkAnswer(+e.currentTarget.value);
	};

	const answers = React.useMemo(() => {
		let answers: number[] = [];
		while (answers.length < 3 && mode && baseNum) {
			let [, , , test] = evaluate(
				mode,
				baseNum,
				RandomNumber(1, mode === "Multiplication" ? 12 : maxNum)
			);
			test = Math.abs(test);

			if (!answers.includes(test) && test !== answer) {
				answers.push(test);
			}
		}

		return [...answers, answer];
	}, [mode, baseNum, answer, maxNum]);

	return (
		<div className="grid w-28 grid-cols-2 gap-4 text-lg">
			{Shuffle(answers).map((answer) => (
				<button
					key={answer}
					type="button"
					className="rounded-md bg-gray-200 p-3 shadow-md shadow-orange-200 hover:bg-zinc-600 hover:text-white"
					value={answer}
					onClick={handleClick}
				>
					{answer}
				</button>
			))}
		</div>
	);
}

export default MultipleChoiceAnswer;
