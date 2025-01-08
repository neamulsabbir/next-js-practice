export interface IAllProducts {
	data: Products[];
	current_page: number;
	per_page: number;
	total: number;
	last_page: number;
	next_page_url: string;
	prev_page_url: any;
}

export interface Products {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	created_at: string;
	updated_at: string;
}
