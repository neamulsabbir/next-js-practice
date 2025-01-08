import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
	handleClick?: () => void;
	children: ReactNode;
}

export const Button: FC<PropsType> = ({ handleClick, children, ...rest }) => {
	return (
		<button onClick={handleClick} className="bg-gray-900 text-white py-2 px-3 rounded-lg" {...rest}>
			{children}
		</button>
	);
};
