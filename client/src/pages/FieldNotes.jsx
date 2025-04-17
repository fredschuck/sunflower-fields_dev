import React, { useState } from "react";
import { TextField, Button, Box, Paper, Grid, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FieldNotes = () => {
  const [fieldData, setFieldData] = useState({
    date: new Date(),
    fieldName: "",
    temperature: "",
    humidity: "",
    soilMoisture: "",
    rainfall: "",
    cropStage: "",
    pestObservations: "",
    diseaseObservations: "",
    irrigationStatus: "",
    fertilizationNotes: "",
    generalNotes: "",
    weatherConditions: "",
    soilConditions: "",
    workPerformed: "",
  });

  const handleChange = (field) => (event) => {
    setFieldData({
      ...fieldData,
      [field]: event.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setFieldData({
      ...fieldData,
      date: newDate,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement submission logic to save the field notes
    console.log("Field Data:", fieldData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Field Notes
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={fieldData.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field Name"
                value={fieldData.fieldName}
                onChange={handleChange("fieldName")}
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Temperature (°F)"
                type="number"
                value={fieldData.temperature}
                onChange={handleChange("temperature")}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Humidity (%)"
                type="number"
                value={fieldData.humidity}
                onChange={handleChange("humidity")}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Soil Moisture (%)"
                type="number"
                value={fieldData.soilMoisture}
                onChange={handleChange("soilMoisture")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rainfall (inches)"
                type="number"
                value={fieldData.rainfall}
                onChange={handleChange("rainfall")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Crop Stage"
                value={fieldData.cropStage}
                onChange={handleChange("cropStage")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Weather Conditions"
                value={fieldData.weatherConditions}
                onChange={handleChange("weatherConditions")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Soil Conditions"
                value={fieldData.soilConditions}
                onChange={handleChange("soilConditions")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pest Observations"
                value={fieldData.pestObservations}
                onChange={handleChange("pestObservations")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Disease Observations"
                value={fieldData.diseaseObservations}
                onChange={handleChange("diseaseObservations")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Irrigation Status"
                value={fieldData.irrigationStatus}
                onChange={handleChange("irrigationStatus")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fertilization Notes"
                value={fieldData.fertilizationNotes}
                onChange={handleChange("fertilizationNotes")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Work Performed"
                value={fieldData.workPerformed}
                onChange={handleChange("workPerformed")}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="General Notes"
                value={fieldData.generalNotes}
                onChange={handleChange("generalNotes")}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Save Field Notes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default FieldNotes;
