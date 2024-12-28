import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { pdfjs } from "react-pdf";

const PDFHandler = () => {
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  // const [pdfdata, setPdfdata] = useState();

  const [pdfLink, setPdfLink] = useState("");
  const userData = JSON.parse(sessionStorage.getItem("userdata"));
  const patientId = userData ? userData._id : null;

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        if (patientId) {
          const response = await fetch(
            `http://localhost:8000/api/pdfdetails/getPDFsByPatientId/${patientId}`
          );
          const data = await response.json();
          if (data && data.data) {
            setAllPrescriptions(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  const handleOpenPDFModal = async (prescriptionId) => {
    console.log(prescriptionId);
    if (prescriptionId) {
      // const response = await fetch(
      //   `http://localhost:8000/api/pdfdetails/getById/${prescriptionId}`
      // );
      // const pdfdata =  response.data;

      axios
        .get(`http://localhost:8000/api/pdfdetails/getById/${prescriptionId}`)
        .then((response) => (response.status === 200 ? response.data : null))
        .then((pdfdata) => {
          console.log(pdfdata)
          var len = pdfdata.length;
          var bytes = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            bytes[i] = pdfdata.charCodeAt(i);
          }
          const renderPdf = bytes.buffer;
          // setPdfdata(renderPdf);
          // setShowPdfModal(true);
          var blob = new Blob([bytes], { type: "application/pdf" });
          // console.log(bytes)
          var link = window.URL.createObjectURL(blob);
          window.open(link, "", "height=650,width=840");
        });
    }
  };

  const handleClosePdfModal = async () => {
    setShowPdfModal(false);
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Prescriptions</h2>
        {allPrescriptions.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Hospital Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Doctor Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Date
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  PDF
                </th>
              </tr>
            </thead>

            <tbody>
              {allPrescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {prescription.hospitalName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {prescription.doctorName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(prescription.date).toLocaleDateString()}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <Button
                      onClick={() => {
                        handleOpenPDFModal(prescription._id);
                      }}
                    >
                      View Prescription
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
      {/* <div>
        <Modal show={showPdfModal} onHide={handleClosePdfModal}>
          <Modal.Header closeButton>
            <Modal.Title>Prescription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pdfjs
              file={{
                data: pdfdata,
              }}
            />
          </Modal.Body>
        </Modal>
      </div> */}
    </>
  );
};

export default PDFHandler;
