import { FC } from "react";
import { TableLoader } from "./TableLoader";

interface PropsType {
	data: any;
	tableHeader: string[];
	isLoading: boolean;
	children: any;
}

export const ReusableTable: FC<PropsType> = ({ tableHeader, data, isLoading, children }) => {
	return (
		<table className="w-full min-w-max table-auto text-left">
			<thead>
				<tr>
					{tableHeader?.map((head) => (
						<th key={head} className="border-b border-blue-gray-100 bg-gray-100 p-4">
							<p className="font-medium leading-none">{head}</p>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{isLoading ? (
					<TableLoader rowNumber={5} cellNumber={tableHeader?.length} />
				) : data?.length > 0 ? (
					children
				) : (
					<tr>
						<td className="text-center py-40" colSpan={tableHeader.length}>
							No Data Found
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
