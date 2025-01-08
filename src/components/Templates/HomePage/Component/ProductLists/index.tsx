import { IAllProducts } from "@/components/libs/interface/products";
import { Pagination, ReusableTable } from "@/components/SharedFolder";
import { FC } from "react";
import { TableRow } from "./TableRow";

interface PropsType {
	data: IAllProducts;
	loading: boolean;
}
export const ProductLists: FC<PropsType> = ({ data, loading }) => {
	console.log(data?.data);
	const ClientTableHeader: string[] = ["Name", "Email"];
	return (
		<>
			<div className="border">
				<ReusableTable tableHeader={ClientTableHeader} isLoading={loading} data={data?.data}>
					{data?.data?.map((data, i) => (
						<tr key={i} className="cursor-pointer hover:bg-gray-100">
							<TableRow data={data} />
						</tr>
					))}
				</ReusableTable>
			</div>

			{data && !loading && (
				<Pagination totalCount={data?.total} totalPages={data?.total} currentPage={data?.current_page} />
			)}
		</>
	);
};
