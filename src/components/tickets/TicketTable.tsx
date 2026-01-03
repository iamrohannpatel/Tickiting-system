import React, { ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Ticket } from "../../context/TicketContext";

export interface ColumnDef {
    header: string;
    accessorKey?: keyof Ticket;
    cell?: (ticket: Ticket) => ReactNode;
    className?: string; // Additional class for the cell
}

interface TicketTableProps {
    tickets: Ticket[];
    columns: ColumnDef[];
    emptyMessage?: string;
    loading?: boolean;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, columns, emptyMessage = "No tickets found.", loading = false }) => {
    return (
        <div className="max-w-full overflow-x-auto">
            <Table>
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableCell
                                key={idx}
                                isHeader
                                className={`py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400 ${col.className || ''}`}
                            >
                                {col.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <TableRow key={idx}>
                                {columns.map((_, colIdx) => (
                                    <TableCell key={colIdx} className="py-4">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-3/4"></div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                {columns.map((col, idx) => (
                                    <TableCell key={idx} className={`py-3 text-gray-800 text-theme-sm dark:text-white/90 ${col.className || ''}`}>
                                        {col.cell ? col.cell(ticket) : (
                                            col.accessorKey ? String(ticket[col.accessorKey] || '') : ''
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="py-8 text-center text-gray-500 dark:text-gray-400" colSpan={columns.length}>
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TicketTable;
