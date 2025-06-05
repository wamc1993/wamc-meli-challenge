import { MeliUserData } from "@/types/form";

export const mockUsers: Record<string, MeliUserData> = {
	abc123: {
		fullName: "Juan Pérez",
		email: "juan.perez@example.com",
		country: "CO",
		address: "Calle 123, Bogotá",
	},
	xyz789: {
		fullName: "Carlos Lima",
		email: "carlos.lima@example.com",
		country: "BR",
		address: "Rua das Flores 45, São Paulo",
	},
	// ⚠️ Usuario con email faltante
	noEmail1: {
		fullName: "Pedro Salazar",
		email: "",
		country: "CO",
		address: "Cra. 7 #45-30, Bogotá",
	},
	// ⚠️ Usuario con país no soportado
	invalidCountry: {
		fullName: "Ricardo León",
		email: "ricardo.leon@example.com",
		country: "XX",
		address: "Calle inventada 999",
	},
};
