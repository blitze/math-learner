export type Settings = {
	modes: string[];
	baseNums: number[];
	maxNum: number;
	timer: string;
	maxTime: number;
	multipleChoice: boolean;
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
