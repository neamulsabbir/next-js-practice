"use client";

import { IAllProducts } from "@/components/libs/interface/products";
import { Container, SearchInput } from "@/components/SharedFolder";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductLists } from "./Component";

export const HomePageUnit = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<IAllProducts | null>(null);

	const searchParams = useSearchParams();

	const query = Object.fromEntries(searchParams.entries());

	const { page, search } = query;

	const fetchData = async () => {
		setLoading(true);
		try {
			const url = new URL("https://api.razzakfashion.com/");

			if (page) url.searchParams.append("page", page);
			if (search) url.searchParams.append("search", search);

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			const data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page, search]);

	return (
		<Container>
			<div className="py-10">
				<div className="flex justify-start ">
					<div className=" w-72 mb-2">
						<SearchInput searchKey="search" placeholder="Search by name..." />
					</div>
				</div>

				<ProductLists data={data as IAllProducts} loading={loading} />

				<div className="mt-10">
					<Link href="/t-shirt">Click here for t-shirt design</Link>
				</div>
			</div>
		</Container>
	);
};
