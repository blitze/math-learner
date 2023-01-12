import type { Stats } from "./types";

export const POINTS_PER_QUESTION = 10;

export const operationOptions: string[] = [
	"Addition",
	"Subtraction",
	"Multiplication",
	"Division",
];

export const feedbackMsgs = {
	// ran out of time
	"-1": ["Focus", "Quick", "Out of time!"],

	// wrong on first try
	0: ["Not quite! Try again", "Try again!"],

	// wrong on second try
	1: ["Incorrect!", "Not quite!", "Nope!"],

	// correct on second try
	5: ["Correct!", "Sweet!", "Nice!"],

	// correct at first try
	10: ["Well done!", "Nice work!", "Excellent!", "Whoohoo!", "Super!"],
};

export const viewOptions: string[] = ["Game", "Stats", "Profiles", "Settings"];

export const baseNumOptions: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const answerModes = {
	MULTICHOICE: "Multiple Choice",
	USERINPUT: "User Input",
	MISSING: "Missing Number",
};

export const TIMERS = {
	NONE: 0,
	SPEED_DRILL: 1,
	FLASH_DRILL: 2,
};

export const TRANS_TIMERS = {
	[TIMERS.NONE]: "None",
	[TIMERS.SPEED_DRILL]: "Speed Drill",
	[TIMERS.FLASH_DRILL]: "Flash Drill",
};

export const GAME_STATUS = {
	NOT_STARTED: 0,
	STARTED: 1,
	PAUSED: 2,
	ENDED: 3,
};

export const defaultSettings = {
	mode: answerModes.MULTICHOICE,
	operations: [],
	baseNums: [],
	maxNum: {
		Addition: 10,
		Division: 20,
		Multiplication: 12,
		Subtraction: 10,
	},
	timer: 0,
	maxTime: 1,
	maxQuestions: 0,
	multipleChoice: true,
	negatives: false,
};

export const defaultGameData = {
	count: 0,
	attempted: 0,
	attempts: 0,
	score: 0,
	inARow: 0,
	mostInARow: 0,
	bonus: 0,
	status: GAME_STATUS.NOT_STARTED,
	msgCode: undefined,
	elapsedTime: 0,
	stats: {},
};

// Returns random number between min and max
export function RandomNumber(min: number, max: number): number {
	return ((Math.random() * (max - min + 1)) | 0) + min;
}

// Select random item from a list
export function RandomItem<T>(items: T[]) {
	return items[Math.floor(Math.random() * items.length)];
}

// Randomly rearrange items in a list
export function Shuffle<T>(items: T[]) {
	return items.sort(() => Math.random() - 0.5);
}

// Sort numbers
export function NumericSort(items: number[], desc: boolean = false) {
	const sortedItems = items.sort((a, b) => a - b);
	return !desc ? sortedItems : sortedItems.reverse();
}

export function updateStats(
	stats: Stats,
	mode: string,
	problem: string,
	baseNum: number,
	isCorrect: boolean
) {
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

export function getPercentScore(
	score: number,
	count: number,
	maxQuestions: number = 0
) {
	if (!score) return 0;

	const possiblePoints =
		POINTS_PER_QUESTION * (maxQuestions ? maxQuestions : count);

	return ((score / possiblePoints) * 100).toFixed(1);
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

	for (let i = 0; i < 3; i++) {
		let newAnswer = -1;
		do {
			// const randOpt = Math.floor(Math.random() * 2); //Should we add or subtract the random number
			const randBase = RandomNumber(1, 5); // Math.floor(Math.random() * 5) + 1; //Plus 1 so it doesn't equal zero. Change the 5 to modify how much the generated answers will differ from the real answer
			if (RandomNumber(0, 1)) {
				//Add
				newAnswer = answer + randBase;
			} else {
				//Subtract
				newAnswer = answer - randBase;
			}
		} while (!checkUnique(newAnswer)); //Make sure wrong answer doesn't conflict with any other answers
		answerChoices.push(newAnswer); //Add new fake answer to list
	}

	return Shuffle(answerChoices) as number[];
}

export function capitalize(str: string) {
	const [first, ...rest] = str.toLowerCase();
	return [first.toUpperCase(), ...rest].join("");
}
