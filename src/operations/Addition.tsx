import { useMemo } from "react";
import type { Settings } from "../types";
import {
	answerModes,
	NumericSort,
	randomAnswerGenerator,
	RandomItem,
	RandomNumber,
	Shuffle,
} from "../utils";

export default function Addition(settings: Settings) {
	return useMemo(() => {
		const [num1, num2] = Shuffle<number>([
			RandomItem<number>(settings.baseNums),
			RandomNumber(0, settings.maxNum.Addition),
		]);
		const answer = num1 + num2;
		const multiOptions =
			settings.mode === answerModes.MULTICHOICE
				? randomAnswerGenerator(answer)
				: [];
		const missingIndex = RandomNumber(0, 2);

		return {
			num1,
			num2,
			answer,
			multiOptions,
			missingIndex,
			baseNum: NumericSort([num1, num2])[0],
			opSymbol: "+",
			op: "Addition",
		};
	}, [settings]);
}
