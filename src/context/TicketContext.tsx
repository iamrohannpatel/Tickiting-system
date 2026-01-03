import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Ticket {
    id: string;
    issue: string;
    description?: string;
    category: string;
    status: 'Pending' | 'Approved' | 'Assigned' | 'In Progress' | 'Completed' | 'Closed' | 'Reopened' | 'Rejected';
    lastUpdated: string;
    image?: string;
    teacherName: string;
    proofImage?: string;
    assignedTo?: string;
}

interface TicketContextType {
    tickets: Ticket[];
    loading: boolean;
    addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'lastUpdated'>) => void;
    updateTicketStatus: (id: string, status: Ticket['status']) => void;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    getTicket: (id: string) => Ticket | undefined;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Initial Mock Data
const initialTickets: Ticket[] = [
    { id: "TKT-001", issue: "Projector not working in Room 101", category: "Hardware", status: "Pending", lastUpdated: "2023-10-25", teacherName: "John Doe" },
    { id: "TKT-002", issue: "AC leaking in Staff Room", category: "Appliance", status: "In Progress", lastUpdated: "2023-10-24", teacherName: "Jane Smith", assignedTo: "Sarah Technician" },
    { id: "TKT-003", issue: "Broken chair in Lab 3", category: "Furniture", status: "Completed", lastUpdated: "2023-10-23", teacherName: "Mike Johnson", proofImage: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", assignedTo: "Mike Carpenter" },
    { id: "TKT-004", issue: "Whiteboard needs replacement", category: "Furniture", status: "Closed", lastUpdated: "2023-10-20", teacherName: "Emily Davis", assignedTo: "Mike Carpenter" },
    { id: "TKT-005", issue: "Internet slow in Library", category: "Network", status: "Assigned", lastUpdated: "2023-10-26", teacherName: "Sarah Wilson", assignedTo: "John Network" },
];

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]); // Start empty
    const [loading, setLoading] = useState<boolean>(true);

    React.useEffect(() => {
        // Simulate API fetch delay
        const timer = setTimeout(() => {
            setTickets(initialTickets);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const addTicket = (newTicketData: Omit<Ticket, 'id' | 'status' | 'lastUpdated'>) => {
        const newTicket: Ticket = {
            ...newTicketData,
            id: `TKT-00${tickets.length + 1}`,
            status: 'Pending',
            lastUpdated: new Date().toISOString().split('T')[0],
        };
        setTickets((prev) => [newTicket, ...prev]);
    };

    const updateTicketStatus = (id: string, status: Ticket['status']) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status, lastUpdated: new Date().toISOString().split('T')[0] } : t))
        );
    };

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : t))
        );
    };

    const getTicket = (id: string) => tickets.find((t) => t.id === id);

    return (
        <TicketContext.Provider value={{ tickets, loading, addTicket, updateTicketStatus, updateTicket, getTicket }}>
            {children}
        </TicketContext.Provider>
    );
};



export const useTickets = () => {
    const context = useContext(TicketContext);
    if (context === undefined) {
        throw new Error('useTickets must be used within a TicketProvider');
    }
    return context;
};
