import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Papa from "papaparse";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DataTable from "./components/DataTable";
import UploadArea from "./components/UploadArea";

const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
  },
});

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

function App() {
  const [csvData, setCsvData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
        showSnackbar("File uploaded successfully!", "success");
      },
      header: true,
      error: (error) => {
        showSnackbar(`Error parsing CSV: ${error.message}`, "error");
      },
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.size <= FILE_SIZE_LIMIT) {
      parseCSV(file);
    } else {
      showSnackbar("File size exceeds 5MB limit", "error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    minSize: 0,
    maxSize: FILE_SIZE_LIMIT,
    accept: { "text/csv": [".csv"] },
  });

  const handleReset = () => {
    setCsvData(null);
    showSnackbar("Ready to upload a new file", "info");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Glimpse CSV File Uploader and Viewer
        </Typography>
        {!csvData ? (
          <UploadArea
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
        ) : (
          <Box sx={{ width: "100%" }}>
            <DataTable data={csvData} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  boxShadow: 3,
                  "&:hover": { boxShadow: 5 },
                }}
              >
                Reset and Upload New File
              </Button>
            </Box>
          </Box>
        )}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
