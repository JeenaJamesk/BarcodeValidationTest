import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

import './table.css';

type Row = {
    id: number;
    barcode: string;
    status: string;
};

type TableProps = {
    data: Row[];
    rowsPerPage?: number;
};

const StatusIndicator = ({ status }: { status: string }) => {
    if (status === "Validating...") {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Loader2 size={16} className="spin" style={{ color: "#3b82f6" }} />
                <span>{status}</span>
            </div>
        );
    }
    
    if (status === "Valid barcode") {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
                <span style={{ color: "#22c55e" }}>{status}</span>
            </div>
        );
    }
    
    if (status === "Invalid barcode") {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <XCircle size={16} style={{ color: "#ef4444" }} />
                <span style={{ color: "#ef4444" }}>{status}</span>
            </div>
        );
    }
    
    return <span>{status}</span>;
};

export default function Table({
    data,
    rowsPerPage = 3
}: TableProps) {
    const [page, setPage] = useState(0);

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
            
            <table className="tableStyle" style={{ borderSpacing: 0 }}>
                <thead>
                    <tr>
                        <th className="headingStyle">Barcode</th>
                        <th className="headingStyle">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index}>
                            <td className="textStyle">{row.barcode}</td>
                            <td className="textStyle">
                                <StatusIndicator status={row.status} />
                            </td>
                        </tr>
                    ))}

                    {paginatedData.length === 0 && (
                        <tr>
                            <td colSpan={2} className="empty">
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    disabled={page === 0}
                >
                    Prev
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages - 1))
                    }
                    disabled={page >= totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}