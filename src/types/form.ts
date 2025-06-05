export interface FormInfo {
	fullName: string;
	email: string;
	country: string;
	address: string;
}

export interface FormSubmitInfo extends FormInfo {
	referrer?: string;
	token?: string;
	captchaResponse?: string;
}

export interface MeliCountry {
	code: string;
	name: string;
}

export interface MeliUserData {
	fullName: string;
	email: string;
	country: string;
	address: string;
}
