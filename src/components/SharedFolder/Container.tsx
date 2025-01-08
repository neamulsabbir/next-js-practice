import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className="px-4 sm:px-24 md:px-32 lg:px-56 xl:px-72 2xl:px-96">{children}</div>;
};
