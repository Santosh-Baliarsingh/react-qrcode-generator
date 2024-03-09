import { Box, Modal, TextField, Typography } from "@mui/material";
import { styles } from "./App.style";
import { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import QRCode from "qrcode.react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { keyframes } from "@emotion/react";

function App() {
  const [qrData, setQRData] = useState<string>("");
  const [qrCodes, setQRCodes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [showQrCode, setShowQrCode] = useState(false);
  const handleClose = () => {
    setOpen(false);
    location.reload();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQRData(event.target.value);
  };

  const handleGenerateQRCode = () => {
    if (qrData.trim() !== "") {
      setQRCodes([...qrCodes, qrData]);
      localStorage.setItem("qrCodes", JSON.stringify([...qrCodes, qrData]));
      setQRData("");
    }
    handleClose();
  };

  const storedQRCodes = localStorage.getItem("qrCodes");
  if (storedQRCodes) {
    const parsedQRCodes: string[] = JSON.parse(storedQRCodes);
    if (parsedQRCodes.length !== qrCodes.length) {
      setQRCodes(parsedQRCodes);
    }
  }

  const handleDeleteQRCode = (index: number) => {
    const newQRCodes = qrCodes.filter((_, i) => i !== index);
    setQRCodes(newQRCodes);
    localStorage.setItem("qrCodes", JSON.stringify(newQRCodes));
  };

  const colorAnimation = keyframes`
  0% {
    color: #FFFFFF; 
}
50% {
    color: #4B6584; 
}
100% {
    color: #2C3A47; 
}
`;

  const shadowAnimation = keyframes`
  0% {
    text-shadow: 0 0 10px #4B6584, 0 0 20px #4B6584, 0 0 30px #4B6584, 0 0 40px #4B6584;
}
50% {
    text-shadow: 0 0 20px #4B6584, 0 0 30px #2C3A47, 0 0 40px #2C3A47, 0 0 50px #2C3A47, 0 0 60px #2C3A47;
}
100% {
    text-shadow: 0 0 10px #4B6584, 0 0 20px #4B6584, 0 0 30px #4B6584, 0 0 40px #4B6584;
}
`;

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.generateBox}>
          <Box
            sx={{
              ...styles.Navtitle,
              animation: `${colorAnimation} 3s infinite, ${shadowAnimation} 3s infinite`,
            }}
          >
            QR Code Generator
          </Box>
          <Box onClick={handleOpen} sx={styles.generateNew}>
            <AddCircleOutlineOutlinedIcon />
            <Box sx={styles.buttontitle}>Generate QR Code</Box>
          </Box>
        </Box>

        <Box sx={styles.allQrBox}>
          {qrCodes.map((code, index) => (
            <Box sx={styles.qrContainer} key={index}>
              <QRCode value={code} size={200} />

              <Box sx={styles.qrbtnbox}>
                <Box
                  onClick={() => handleDeleteQRCode(index)}
                  sx={styles.reuse}
                >
                  Delete
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Modal
          open={open}
          sx={styles.modalBox}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modalStyles}>
            <Box sx={styles.modalqueryHead}>
              {!showQrCode ? (
                <Box sx={styles.qrBox}>
                  <Typography sx={styles.qrboxhead}>Click here to</Typography>
                  <Box onClick={() => setShowQrCode(true)} sx={styles.showQr}>
                    Generate Qr
                  </Box>
                </Box>
              ) : (
                <QRCode value={qrData} />
              )}
            </Box>
            <Box sx={styles.textFieldBoxmedium}>
              <TextField
                multiline
                rows={3}
                fullWidth
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                label="Description"
                value={qrData}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Box>
            <Box sx={styles.textFieldBoxsmall}>
              <TextField
                multiline
                rows={3}
                fullWidth
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                label="Description"
                value={qrData}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Box>
            <Box sx={styles.sendBtn}>
              <Box onClick={handleClose} sx={styles.cancel}>
                Cancel
              </Box>
              <Box onClick={handleGenerateQRCode} sx={styles.send}>
                Save
              </Box>
            </Box>
            <Box onClick={handleClose} sx={styles.closeBox}>
              <CloseSharpIcon />
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default App;
