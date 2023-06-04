import { useState, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import GetAppIcon from "@mui/icons-material/GetApp";

// Interfaces
import { IExportCiudadJSON, IGenerateReports } from "../../interfaces";

// Services
import { exportReport } from "../../services";

// Components
import { Preview } from "../../components";

const GenerateReports = () => {
  const [loading, setLoading] = useState(false);
  const downloadBtn = useRef<HTMLAnchorElement | null>(null);

  const [prev, setPrev] = useState<IExportCiudadJSON[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IGenerateReports>({
    defaultValues: {
      typeReport: "Seleccionar",
      typeExport: "Seleccionar",
    },
  });

  const handleGeneratePreview = ({ typeReport }: IGenerateReports) => {
    setLoading(true);
    exportReport({ typeExport: "JSON", typeReport }).then(
      ({ export: exportData }) => {
        setLoading(false);
        setPrev(exportData as IExportCiudadJSON[]);
      }
    );
  };

  const handleExport = (data: IGenerateReports) => {
    setLoading(true);
    exportReport(data).then(({ export: exporData, success }) => {
      setLoading(false);
      switch (data.typeExport) {
        case "EXCEL":
          if (downloadBtn.current && success) {
            downloadBtn.current.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${exporData}`;
            downloadBtn.current.download = "reporte.xlsx";
            downloadBtn.current.click();
          }
          break;
        case "PDF":
          if (downloadBtn.current && success && typeof exporData === "string") {
            downloadBtn.current.href = `data:application/pdf;base64,${exporData}`;
            downloadBtn.current.download = "reporte.pdf";
            downloadBtn.current.click();
          }
          break;
        default:
          break;
      }
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Exportar reportes
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit(handleGeneratePreview)}>
        <Box
          sx={{
            display: "flex",
            marginBottom: "1rem",
            justifyContent: "space-between",
          }}
        >
          <TextField
            disabled={loading}
            fullWidth
            select
            placeholder="Ej Ciudad"
            label="Tipo de reporte*"
            error={!!errors.typeReport}
            sx={{ width: "49%" }}
            helperText={
              errors.typeReport
                ? errors.typeReport.message
                : "Selecciona el tipo de reporte que deseas exportar..."
            }
            {...register("typeReport", {
              required: "El tipo de reporte es obligatorio",
              validate: (value) =>
                value !== "Seleccionar" || "Selecciona una administrador",
            })}
            value={watch("typeReport")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DocumentScannerIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
            <MenuItem value={"ciudad"}>Ciudad</MenuItem>
            <MenuItem value={"cliente"}>Cliente</MenuItem>
          </TextField>
          <TextField
            disabled={loading}
            fullWidth
            select
            placeholder="Ej PDF"
            label="Tipo de exportación*"
            error={!!errors.typeExport}
            sx={{ width: "49%" }}
            helperText={
              errors.typeExport
                ? errors.typeExport.message
                : "Selecciona el tipo de exportación que deseas..."
            }
            {...register("typeExport", {
              required: "El tipo de exportación es obligatorio",
              validate: (value) =>
                value !== "Seleccionar" || "Selecciona un tipo de exportación",
            })}
            value={watch("typeExport")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FileOpenIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
            <MenuItem value={"PDF"}>PDF</MenuItem>
            <MenuItem value={"EXCEL"}>Excel</MenuItem>
            <MenuItem value={"JSON"}>JSON</MenuItem>
          </TextField>
        </Box>
        <Link ref={downloadBtn}>
          <Button
            disabled={loading}
            fullWidth
            type="submit"
            variant="contained"
            color="success"
            startIcon={<GetAppIcon />}
          >
            {loading ? "Generando..." : "Generar vista previa"}
          </Button>
        </Link>
      </form>
      {prev.length > 0 && watch("typeReport") !== "Seleccionar" && (
        <Preview
          prev={prev}
          export={handleExport}
          type={watch("typeReport")}
          data={{
            typeExport: watch("typeExport"),
            typeReport: watch("typeReport"),
          }}
          loading={loading}
        />
      )}
    </Box>
  );
};

export { GenerateReports };
