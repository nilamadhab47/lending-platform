import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from '@mui/material/CircularProgress'; 

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  ariaDescribedBy: string;
  handleClick: () => void;
  loading: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  height: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
};

export default function CancelModal({
  open,
  onClose,
  ariaLabelledBy,
  ariaDescribedBy,
  handleClick,
  loading
}: CustomModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        style={{ borderRadius: "20px" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h4"
            className=" bg-red-500 border-b-1 border-b-black p-4 text-white text-base"
            style={{
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            Serial No.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, p: 4 ,borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15 }}>
            <span className=" mb-4">Comment</span>
            <textarea
              rows={10}
              cols={40}
              className=" mt-4"
              style={{ border: "0.5px solid black", borderRadius: "5px" }}
            />

            <div>
            <Button
                onClick={handleClick}
                variant="outlined"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 27px",
                  borderRadius: "11px",
                  fontSize: "12px",
                  marginTop: "1rem",
                  borderColor: "black",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Cancel"} 
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
