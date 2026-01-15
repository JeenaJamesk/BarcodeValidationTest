import { useState } from "react";

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
                            <td className="textStyle">{row.status}</td>
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