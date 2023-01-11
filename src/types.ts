export type StoredSettings = {
	mode: string;
	timer: number;
	maxTime: number;
	maxQuestions?: number;
};

export type Settings = StoredSettings & {
	operations: string[];
	baseNums: number[];
	maxNum: {
		Addition: number;
		Division: number;
		Multiplication: number;
		Subtraction: number;
	};
	negatives: boolean;
};

export type Stats = {
	[operation: string]: {
		[baseNum: number]: {
			[problem: string]: {
				correct: number;
				incorrect: number;
			};
		};
	};
};

export type StoredGameData = {
	count: number;
	attempted: number;
	score: number;
	mostInARow: number;
	elapsedTime: number;
	bonus: number;
	stats: Stats;
};

export type GameData = StoredGameData & {
	inARow: number;
	attempts: number;
	status: number;
	msgCode?: number;
};

export type Profiles = {
	[name: string]: Settings;
};

export type StoredGameStats = StoredGameData &
	StoredSettings & {
		stats: Stats;
		timestamp?: number;
	};

export type StoredUserStats = {
	[date: string]: StoredGameStats[];
};
