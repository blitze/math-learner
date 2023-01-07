export type Settings = {
	mode: string;
	operations: string[];
	baseNums: number[];
	maxNum: {
		Addition: number;
		Division: number;
		Multiplication: number;
		Subtraction: number;
	};
	timer: string;
	maxTime: number;
	maxQuestions?: number;
};

export type GameData = {
	count: number;
	attempts: number;
	score: number;
	status: number;
	isCorrect?: boolean;
	elapsedTime: number;
};

export type Profiles = {
	[name: string]: Settings;
};

export type Stats = {
	[mode: string]: {
		[baseNum: number]: {
			[problem: string]: {
				correct: number;
				incorrect: number;
			};
		};
	};
};
