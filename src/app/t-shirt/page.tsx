import TShirtPageUnit from "@/components/Templates/TShirtPageUnit";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "T-shirt Design",
};

const TshirtPage: NextPage = () => {
	return <TShirtPageUnit />;
};

export default TshirtPage;
