import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RaisedFormPropsTextFields from '../Form/RaisedInvoiceForm';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  ariaDescribedBy: string;
}

const RaisedInvoiceFormModal: React.FC<CustomModalProps> = ({ open, onClose, ariaLabelledBy, ariaDescribedBy }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 964,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: "scroll",
    height: 700,
    borderRadius: "12px 10px 10px 10px"
  };

  const handleFormSubmit = () => {
    // handle form submission logic
    onClose(); // close the modal after form submission
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <Box sx={style}>
      <RaisedFormPropsTextFields onSubmit={handleFormSubmit} onSuccess={onClose}/>
      </Box>
    </Modal>
  );
};

export default RaisedInvoiceFormModal;