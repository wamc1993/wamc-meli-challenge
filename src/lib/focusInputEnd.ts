export function focusInputEnd(
	input: HTMLInputElement | HTMLTextAreaElement | null
) {
	if (!input) return;

	input.focus();
	const length = input.value.length;
	input.setSelectionRange(length, length);
}
