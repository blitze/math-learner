import React from "react";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import SingleChoiceAnswer from "./SingleChoiceAnswer";
import { evaluate, RandomItem } from "../utils";
import { Settings } from "../types";

type Props = {
	settings: Settings;
	newProblem: boolean;
	showAnswer: boolean;
	onAnswer: (
		mode: string,
		problem: string,
		baseNum: number,
		isCorrect: boolean
	) => void;
};

type Results = [number, string, number, number];

function Problem({ settings, newProblem, showAnswer, onAnswer }: Props) {
	const [mode, setMode] = React.useState<string>("");
	const [baseNum, setBaseNum] = React.useState<number>(0);
	const [results, setResults] = React.useState<Results>([0, "", 0, 0]);

	React.useEffect(() => {
		setMode(RandomItem(settings.modes) as string);
		setBaseNum(RandomItem(settings.baseNums) as number);
		setResults(evaluate(mode, baseNum, settings.maxNum));
	}, [newProblem, mode, baseNum, settings]);

	const [num1, operator, num2, answer] = results;

	const checkAnswer = (test: number) => {
		const problem = `${num1} ${operator} ${num2} = ${answer}`;
		onAnswer(mode, problem, baseNum, test === answer);
	};

	return (
		<div className="my-8 flex h-16 items-center justify-center gap-4 font-bold">
			<div className="w-1/2 text-right text-4xl">{`${num1} ${operator} ${num2} = `}</div>
			<div className="w-1/2 text-left">
				{showAnswer ? (
					<p className="text-4xl">{answer}</p>
				) : settings.multipleChoice ? (
					<MultipleChoiceAnswer
						mode={mode}
						baseNum={baseNum}
						maxNum={settings.maxNum}
						answer={answer}
						checkAnswer={checkAnswer}
					/>
				) : (
					<SingleChoiceAnswer checkAnswer={checkAnswer} />
				)}
			</div>
		</div>
	);
}

export default React.memo(Problem);
