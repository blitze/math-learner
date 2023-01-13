import { useState } from "react";
import { useTimeout } from "usehooks-ts";
import { feedbackMsgs, RandomItem } from "../utils";
import * as sounds from "../sounds";

type Props = {
	msgCode?: number;
};

export default function Feedback({ msgCode }: Props) {
	const [message, setMessage] = useState<string>(() => {
		if (msgCode !== undefined) {
			new Audio(msgCode > 4 ? sounds.success : sounds.try_again).play();
			return RandomItem<string>(
				feedbackMsgs[msgCode as keyof typeof feedbackMsgs]
			);
		}
		return "";
	});

	const hide = () => setMessage("");

	useTimeout(hide, message ? 3000 : null);

	return msgCode && message ? (
		<div
			className={`absolute top-20 right-5 ${
				msgCode > 4 ? "bg-green-500" : "bg-red-500"
			} rounded px-4 py-2 shadow-sm`}
		>
			{message}
		</div>
	) : null;
}
