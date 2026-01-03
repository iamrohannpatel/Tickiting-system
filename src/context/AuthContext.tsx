import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "admin" | "teacher" | "maintenance" | null;

interface User {
    id: string;
    name: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Initialize from localStorage
        const storedRole = localStorage.getItem("userRole") as UserRole;
        if (storedRole) {
            setUser({
                id: "123",
                name: storedRole.charAt(0).toUpperCase() + storedRole.slice(1) + " User",
                role: storedRole,
            });
        }
    }, []);

    const login = (role: UserRole) => {
        // Mock login logic
        const mockUser: User = {
            id: "123",
            name: role ? role.charAt(0).toUpperCase() + role.slice(1) + " User" : "User",
            role: role,
        };
        setUser(mockUser);
        if (role) localStorage.setItem("userRole", role);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userRole");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
