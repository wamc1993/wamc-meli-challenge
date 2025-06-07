import { z } from "zod";

import { MeliField } from "@/types/form";

export const buildSchema = (questions: MeliField[]) => {
	const defaultValues: Record<string, unknown> = {};
	const shape: Record<string, z.ZodTypeAny> = {};

	questions.forEach((question) => {
		let fieldSchema: z.ZodTypeAny;
		const { type, validation, label } = question;

		if (type === "text") {
			const { minLength, required, pattern } = validation || {};
			fieldSchema = z.string();

			if (required !== undefined) {
				fieldSchema = (fieldSchema as z.ZodString).min(
					1,
					`${label} es requerido`
				);
			}

			if (minLength !== undefined) {
				fieldSchema = (fieldSchema as z.ZodString).min(
					minLength,
					`${label} debe tener ${minLength} caracteres o más`
				);
			}

			if (pattern !== undefined) {
				fieldSchema = (fieldSchema as z.ZodString).regex(
					pattern,
					`${label} no tiene un formato correcto`
				);
			}
		} else if (type === "number") {
			fieldSchema = z.coerce.number();
			const { required, min } = validation || {};

			if (required !== undefined) {
				fieldSchema = (fieldSchema as z.ZodNumber).int(
					`Ingresa un valor`
				);
			}

			if (min !== undefined) {
				fieldSchema = (fieldSchema as z.ZodNumber).gte(
					min,
					`${label} debe ser mayor o igual a ${min}`
				);
			}
		} else if (type === "select") {
			fieldSchema = z.string();
			const { required } = validation || {};
			if (required !== undefined) {
				fieldSchema = (fieldSchema as z.ZodString).min(
					1,
					`${label} es requerido`
				);
			}
		} else if (type === "boolean") {
			fieldSchema = z.coerce.boolean();
		} else {
			fieldSchema = z.any();
		}

		shape[question.name] = fieldSchema;
		defaultValues[question.name] = question.default;
	});

	return {
		defaultValues,
		schema: z.object(shape),
	};
};
