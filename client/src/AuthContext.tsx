import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		(async () => {
			const token = localStorage.getItem("token");

			if (!token) return;

			const res = await fetch("https://typequiz.onrender.com/users/me", { headers: { "Authorization": `Bearer ${token}` } });
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

export const useAuth = () => useContext(AuthContext);
