export interface ListingState {
	list: Coin[];
}

export interface Coin {
	id: string;
	name: string;
	image: string;
	symbol: string;
	slug: string;
	rank: number;
	is_active: number;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
}

export interface CoinUpdate {
	coin: Coin;
	differencePercent: number;
	differenceAmount: number;
}
