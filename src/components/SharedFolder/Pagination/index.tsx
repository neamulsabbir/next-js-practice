import { formatNumber } from "@/components/utils/helpers/format.helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, FC } from "react";
import { Items } from "./Items";

export const Pagination: FC<PaginProps> = (props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const { currentPage, totalPages, totalCount, customClickHandler, ...rest } = props;

	const handlePage = (number: number) => {
		if (String(number) === "1") {
			params.delete("page");
		} else {
			params.set("page", String(number));
		}

		router.replace(`?${params.toString()}`);
	};

	return (
		<div className="mt-4 flex items-center">
			{totalPages > 1 && <Items current={currentPage} total={totalPages} onClick={handlePage} />}
			{totalCount! > 0 && (
				<span className="font-medium ml-3 text-sm">Total results {formatNumber(totalCount!)}</span>
			)}
		</div>
	);
};

export interface PaginProps {
	currentPage: number;
	totalPages: number;
	totalCount?: number;
	className?: string;
	style?: CSSProperties;
	customClickHandler?: (page: number) => void;
}

// Pagination.defaultProps = {
// 	currentPage: 1,
// 	totalPages: 1,
// 	totalCount: 0,
// };
