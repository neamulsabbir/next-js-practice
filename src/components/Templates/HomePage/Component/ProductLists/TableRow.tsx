import { Products } from "@/components/libs/interface/products";
import { FC } from "react";

interface Propstype {
	data: Products;
}
export const TableRow: FC<Propstype> = ({ data }) => {
	return (
		<>
			<td className="p-4 border-b border-blue-gray-50">
				<p>{data?.name}</p>
			</td>
			<td className="p-4 border-b border-blue-gray-50">
				<p>{data?.email}</p>
			</td>
		</>
	);
};
