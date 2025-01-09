import { HomePageUnit } from "@/components/Templates/HomePage/HomePageUnit";
import { Suspense } from "react";

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomePageUnit />
		</Suspense>
	);
}
