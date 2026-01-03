import React, { ReactNode } from "react";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps extends React.ThHTMLAttributes<HTMLTableCellElement>, React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
}

const Table: React.FC<TableProps> = ({ children, className = "" }) => {
  return <table className={`min-w-full ${className}`}>{children}</table>;
};

const TableHeader: React.FC<TableHeaderProps> = ({ children, className = "" }) => {
  return <thead className={`${className}`}>{children}</thead>;
};

const TableBody: React.FC<TableBodyProps> = ({ children, className = "" }) => {
  return <tbody className={`${className}`}>{children}</tbody>;
};

const TableRow: React.FC<TableRowProps> = ({ children, className = "" }) => {
  return <tr className={`${className}`}>{children}</tr>;
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = "",
  ...props
}) => {
  const CellTag = isHeader ? "th" : "td";
  // @ts-ignore - Dynamic tag with union props is tricky in TS, but safe for HTML standard attributes
  return <CellTag className={`${className}`} {...props}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
