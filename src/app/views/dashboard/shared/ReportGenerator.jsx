import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const downloadReport = () => {
  const input = document.getElementById("report-content");
  if (!input) {
    console.error("Report content not found!");
    return;
  }

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Carbon_Emission_Report.pdf");
  }).catch((error)=> {
    console.error("Error generating PDF:", error);
  });
};
