import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import PropTypes from "prop-types";
import { useCallback, useMemo, useRef, useState } from "react";

function DataTable({ data }) {
  const [columnTypes, setColumnTypes] = useState({});

  const detectColumnType = useCallback(
    (columnKey) => {
      const sampleSize = Math.min(100, data.length);
      const sample = data.slice(0, sampleSize);
      const isNumeric = sample.every((row) => !isNaN(row[columnKey]));
      return isNumeric ? "numeric" : "text";
    },
    [data]
  );

  const columns = useMemo(
    () =>
      data[0]
        ? Object.keys(data[0]).map((key, index) => ({
            id: key || `column_${index}`,
            header: key,
            accessorFn: (row) => row[key] ?? "",
            size: 150,
          }))
        : [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  const { rows } = table.getRowModel();

  const tableContainerRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: useCallback(() => 53, []),
    overscan: 20,
  });

  const handleColumnHover = useCallback(
    (columnKey) => {
      if (!columnTypes[columnKey]) {
        const type = detectColumnType(columnKey);
        setColumnTypes((prev) => ({ ...prev, [columnKey]: type }));
      }
    },
    [columnTypes, detectColumnType]
  );

  const renderCell = useCallback(
    (cell) => (
      <TableCell
        key={cell.id}
        style={{
          display: "flex",
          width: cell.column.getSize(),
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      </TableCell>
    ),
    []
  );

  return (
    <Box sx={{ boxShadow: 3, borderRadius: 2 }}>
      <TableContainer
        ref={tableContainerRef}
        style={{
          height: "800px",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Table style={{ display: "grid", width: table.getTotalSize() }}>
          <TableHead
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                style={{ display: "flex", width: "100%" }}
              >
                {headerGroup.headers.map((header) => (
                  <Tooltip
                    key={header.id}
                    title={
                      columnTypes[header.column.id]
                        ? `Type: ${columnTypes[header.column.id]}`
                        : "Hover to detect type"
                    }
                    arrow
                  >
                    <TableCell
                      style={{
                        display: "flex",
                        width: header.getSize(),
                        fontWeight: "bold",
                        backgroundColor: "#f5f5f5",
                        position: "relative",
                      }}
                      onMouseEnter={() => handleColumnHover(header.column.id)}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <TableSortLabel
                            active={header.column.getIsSorted() !== false}
                            direction={header.column.getIsSorted() || "asc"}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableSortLabel>
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer ${
                              header.column.getIsResizing() ? "isResizing" : ""
                            }`}
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              height: "100%",
                              width: "2px",
                              background: "rgba(0,0,0,0.2)",
                              cursor: "col-resize",
                              userSelect: "none",
                              touchAction: "none",
                            }}
                          />
                        </>
                      )}
                    </TableCell>
                  </Tooltip>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody
            style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <TableRow
                  key={row.id}
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  style={{
                    display: "flex",
                    position: "absolute",
                    transform: `translateY(${virtualRow.start}px)`,
                    width: "100%",
                  }}
                >
                  {row.getVisibleCells().map(renderCell)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
