import { Stats } from "./types";

export const modeOptions: string[] = [
	"Addition",
	"Subtraction",
	"Multiplication",
	"Division",
];
export const successOptions: string[] = [
	"Correct!",
	"Well done!",
	"Nice work!",
	"Excellent!",
];
export const incorrectOptions: string[] = [
	"Incorrect!",
	"Not quite!",
	"Try again!",
	"Nope!",
];
export const viewOptions: string[] = ["Game", "Settings"];

export const baseNumOptions: number[] = [2, 3, 4, 5, 6, 7, 8, 9];

export function RandomNumber(min: number, max: number): number {
	return ((Math.random() * (max - min + 1)) | 0) + min;
}

export function RandomItem(items: string[] | number[]): string | number {
	return items[Math.floor(Math.random() * items.length)];
}

export function Shuffle(items: (string | number)[]) {
	items.sort(() => Math.random() - 0.5);
	return items;
}

export function evaluate(
	mode: string,
	baseNum: number,
	maxNumber: number
): [number, string, number, number] {
	let answer: number = 0;
	let num2: number = 0;
	let operator: string = "";

	switch (mode) {
		case "Multiplication":
			operator = "x";
			num2 = RandomNumber(1, 12);
			answer = baseNum * num2;
			return [baseNum, operator, num2, answer];
		case "Subtraction":
			operator = "-";
			num2 = RandomNumber(baseNum, maxNumber);
			answer = num2 - baseNum;
			return [num2, operator, baseNum, answer];
		case "Addition":
			operator = "+";
			num2 = RandomNumber(1, maxNumber);
			answer = baseNum + num2;
			return [baseNum, operator, num2, answer];
		case "Division":
			operator = "÷";
			num2 = baseNum * RandomNumber(1, maxNumber);
			answer = num2 / baseNum;
			return [num2, operator, baseNum, answer];
	}
	return [0, "", 0, 0];
}

export function updateStats(
	stats: Stats,
	mode: string,
	problem: string,
	baseNum: number,
	isCorrect: boolean
) {
	// let stats = JSON.parse(localStorage.getItem("stats") || "{}");
	// if (stats[problem] === undefined) {
	// 	stats[problem] = {
	// 		correct: 0,
	// 		incorrect: 0,
	// 	};
	// }
	// if (isCorrect) {
	// 	stats[problem].correct++;
	// } else {
	// 	stats[problem].incorrect++;
	// }
	// localStorage.setItem("stats", JSON.stringify(stats));

	const modeKey = stats[mode] || {};
	const baseNumKey = modeKey[baseNum] || {};
	const probKey = baseNumKey[problem] || { correct: 0, incorrect: 0 };
	const countKey = isCorrect ? "correct" : "incorrect";

	return {
		...stats,
		[mode]: {
			...modeKey,
			[baseNum]: {
				...baseNumKey,
				[problem]: {
					...probKey,
					[countKey]: probKey[countKey] + 1,
				},
			},
		},
	};
}

export function randomAnswerGenerator(answer: number) {
	let answerChoices = [answer];

	const checkUnique = function (val: number) {
		for (var i = 0; i < answerChoices.length; i++) {
			if (answerChoices[i] === val) {
				return false;
			}
		}
		return true;
	};

	for (let i = 0; i < 4; i++) {
		let newAnswer = -1;
		do {
			const randOpt = Math.floor(Math.random() * 2); //Should we add or subtract the random number
			const randBase = Math.floor(Math.random() * 5) + 1; //Plus 1 so it doesn't equal zero. Change the 5 to modify how much the generated answers will differ from the real answer
			if (randOpt === 0) {
				//Add
				newAnswer = answer + randBase;
			} else {
				//Subtract
				newAnswer = answer - randBase;
			}
		} while (!checkUnique(newAnswer)); //Make sure wrong answer doesn't conflict with any other answers
		answerChoices.push(newAnswer); //Add new fake answer to list
	}

	return Shuffle(answerChoices);
}
