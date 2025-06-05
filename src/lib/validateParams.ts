import { mockUsers } from "@/data/users";

const VALID_REFERRERS = ["/previous-step"];

export const validateReferrer = (value: string | undefined): boolean =>
	value !== undefined && VALID_REFERRERS.includes(value);

export const validateToken = (value: string | undefined): boolean =>
	value !== undefined && value.length > 0 && mockUsers.hasOwnProperty(value);
