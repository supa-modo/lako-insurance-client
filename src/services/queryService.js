import api from "./api";

/**
 * Submit a new user query for insurance comparison
 */
export const submitQuery = async (data) => {
  try {
    const response = await api.post("/queries", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting query:", error);
    throw error;
  }
};

/**
 * Get a report by ID
 */
export const getReportById = async (id) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching report ${id}:`, error);
    throw error;
  }
};

/**
 * Download a report as PDF
 */
export const downloadReportPdf = async (id) => {
  try {
    const response = await api.get(`/reports/${id}/download`, {
      responseType: "blob",
    });

    // Create a URL for the blob
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = blobUrl;

    // Get filename from Content-Disposition header or use default
    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `insurance_report_${id}.pdf`;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  } catch (error) {
    console.error(`Error downloading report ${id}:`, error);
    throw error;
  }
};
