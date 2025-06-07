import {
	MeliCountry,
	MeliField,
	MeliSimpleField,
	MeliUserData,
} from "@/types/form";
import { AbusePreventionTranslations } from "@/types/translations";

interface Properties {
	t: AbusePreventionTranslations;
	userData: MeliUserData | null;
	countries: MeliCountry[];
	customFields?: string;
}

export const createFormFields = ({
	customFields,
	t,
	userData,
	countries,
}: Properties): MeliField[] => {
	const basicFields: MeliField[] = [
		{
			name: "fullName",
			label: t.default.fields.fullName.label,
			placeholder: t.default.fields.fullName.placeholder,
			type: "text",
			default: userData?.fullName || "",
			validation: {
				required: true,
			},
		},
		{
			name: "email",
			label: t.default.fields.email.label,
			placeholder: t.default.fields.email.placeholder,
			type: "text",
			default: userData?.email || "",
			validation: {
				required: true,
			},
		},
		{
			name: "country",
			label: t.default.fields.country.label,
			placeholder: t.default.fields.country.placeholder,
			type: "select",
			default: userData?.country || "",
			options: countries.map((c) => ({ value: c.code, label: c.name })),
			validation: {
				required: true,
			},
		},
		{
			name: "address",
			label: t.default.fields.address.label,
			placeholder: t.default.fields.address.placeholder,
			type: "text",
			default: userData?.address || "",
			validation: {
				required: true,
			},
		},
	];

	if (!customFields) {
		return basicFields;
	}

	const decodedSimpleFields = JSON.parse(
		decodeURIComponent(customFields)
	) as MeliSimpleField[];

	const decodedFields = decodedSimpleFields.map(
		(field) =>
			({
				...field,
				default: field.type === "number" ? 0 : "",
				placeholder: "",
			} as MeliField)
	);

	return [...basicFields, ...decodedFields];
};
