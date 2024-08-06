# Glimpse CSV File Uploader and Viewer

This React application allows users to upload and view CSV files in a user-friendly interface. It features a drag-and-drop upload area, a data table for displaying the CSV contents, and responsive notifications.

## Features

1. **CSV File Upload**:

   - Drag-and-drop functionality
   - File size limit of 5MB
   - Accepts only .csv files

2. **Data Visualization**:

   - Displays uploaded CSV data in a sortable, resizable, and virtualized table
   - Virtual scrolling for efficient rendering of large datasets
   - Column type detection (numeric or text)
   - Tooltips showing column types

3. **User Interface**:

   - Material-UI components
   - Snackbar notifications for user feedback

4. **Error Handling**:
   - Displays error messages for file size exceedance and parsing errors

## Main Components

### App.jsx

The main component that orchestrates the application flow. It includes:

- State management for CSV data and notifications
- File upload logic using react-dropzone
- CSV parsing using Papaparse
- Conditional rendering of UploadArea or DataTable

### UploadArea.jsx

A reusable component for the file upload interface. It provides:

- Visual feedback for drag-and-drop actions
- Styled upload area with icon and instructions

### DataTable.jsx

A component for displaying the CSV data. Features include:

- Sortable columns with click-to-sort functionality
- Resizable columns with drag handles
- Virtual scrolling for performance optimization
- Automatic column type detection (numeric or text)
- Tooltips displaying column types on hover
- Fixed header for easy navigation

## Libraries Used

- React
- Material-UI
- react-dropzone
- Papaparse
- @tanstack/react-table
- @tanstack/react-virtual

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Usage

1. Open the application in a web browser
2. Drag and drop a CSV file (up to 5MB) onto the upload area, or click to select a file
3. View the uploaded data in the table
4. Sort columns by clicking on the column headers
5. Resize columns by dragging the column edges
6. Hover over column headers to see detected column types
7. Scroll through large datasets efficiently with virtual scrolling
8. Use the "Reset and Upload New File" button to upload a different file

Enjoy exploring your CSV data with Glimpse CSV File Uploader and Viewer!
