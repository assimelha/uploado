import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const UploadArea = ({ getRootProps, getInputProps, isDragActive }) => {
  const paperStyles = {
    border: "2px dashed #3f51b5",
    borderRadius: 4,
    p: 5,
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: isDragActive ? "#e3e8ff" : "#f0f4ff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#e3e8ff",
      borderColor: "#1a237e",
    },
  };

  return (
    <Paper elevation={3} {...getRootProps()} sx={paperStyles}>
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 60, color: "#3f51b5", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {isDragActive
          ? "Drop the CSV file here"
          : "Drag and drop a CSV file here"}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        or click to select a file
      </Typography>
    </Paper>
  );
};

UploadArea.propTypes = {
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  isDragActive: PropTypes.bool.isRequired,
};

export default UploadArea;
