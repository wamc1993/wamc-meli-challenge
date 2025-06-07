export interface FormInfo {
	fullName: string;
	email: string;
	country: string;
	address: string;
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

export type MeliFieldType = "text" | "number" | "boolean" | "select";

export interface MeliFieldOptions {
	value: string;
	label: string;
}

export interface MeliFieldValidation {
	required?: boolean;
	minLength?: number;
	pattern?: RegExp;
	min?: number;
}

export interface MeliSimpleField {
	name: string;
	label: string;
	type: MeliFieldType;
	options?: MeliFieldOptions[];
}

export interface MeliField extends MeliSimpleField {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: any;
	placeholder?: string;
	validation?: MeliFieldValidation;
}
