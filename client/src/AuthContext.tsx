import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
	_id: string;
	username: string;
}

type AuthContextType = {
	user: User | null;
	setUser: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		(async () => {
			const token = localStorage.getItem("token");

			if (!token) return;

			const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, { headers: { "Authorization": `Bearer ${token}` } });
			const data = await res.json();

			if (res.ok) {
				setUser(data);
			} else {
				localStorage.removeItem("token");
			}
		})();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
