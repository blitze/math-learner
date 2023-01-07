import { useState } from "react";
import { useTimeout } from "usehooks-ts";
import { failureOptions, RandomItem, successOptions } from "../utils";

type Props = {
	isCorrect?: boolean;
};

export default function Feedback({ isCorrect }: Props) {
	const [message, setMessage] = useState<string>(() => {
		const msg =
			isCorrect !== undefined
				? RandomItem<string>(isCorrect ? successOptions : failureOptions)
				: "";
		console.log(isCorrect, msg);
		return msg;
	});

	const hide = () => setMessage("");

	useTimeout(hide, message ? 3000 : null);

	return message ? (
		<div className="absolute right-3 top-16 bg-blue-400 px-3">{message}</div>
	) : null;
}
