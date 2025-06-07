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
	qwe258: {
		fullName: "Pedro Salazar",
		email: "pedro@gmail.com",
		country: "CO",
		address: "Cra. 7 #45-30, Bogotá",
	},
};
