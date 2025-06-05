export {};

declare global {
	interface Window {
		grecaptcha?: {
			render: (
				container: HTMLElement,
				parameters: {
					sitekey: string;
					theme?: "light" | "dark";
					callback?: (response: string) => void;
				}
			) => number;
			reset: (id?: number) => void;
			getResponse: (id?: number) => string;
		};
	}
}
