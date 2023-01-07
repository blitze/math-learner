type Props = {
	value?: number;
	options: number[];
	checkAnswer: (input: number) => void;
};

export default function MultiChoiceAnswer({
	value,
	options,
	checkAnswer,
}: Props) {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
		checkAnswer(+e.currentTarget.value);
	return (
		<div className="grid w-28 grid-cols-2 gap-4 text-lg">
			{options.map((option) => (
				<button
					key={option}
					type="button"
					disabled={!!value}
					className={`rounded-md p-3 shadow-md shadow-orange-200 hover:bg-zinc-600 hover:text-white ${
						value === option
							? "bg-zinc-600 text-white"
							: "bg-gray-200 disabled:opacity-60"
					} hover:text-white`}
					value={option}
					onClick={handleClick}
				>
					{option}
				</button>
			))}
		</div>
	);
}
