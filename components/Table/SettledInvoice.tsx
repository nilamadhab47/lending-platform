"use client";

import { useMemo, useState } from "react";

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

//Mock Data
// import { data } from "@/constants/raiseData";

export type RaisedInvoice = {
  buyer_contact: string;
  buyers_name: string;
  settin_representative: string;
  lead_source: string;
  project_name: string;
  unit_no: string;
  base_price: number;
  total_price: number;
  bookinf_date: string;
  tentative_date_agreement: string;
  advanced_paid: number;
  tentative_date_recieved: string;
  total_commissions: number;
  cp_commisions: number;
  discount_offered: number;
  revenue: number;
  status: string;
  comment: string;
  invoice_no: number;
  invoice_generated_name: string;
  invoice_generated_date: string;
  invoice_date: string;
  invoice_amount: number;
  gst: string;
  tds: string;
  amount_after_Tds_Deducted: number;
  final_invoice: number;
  invoice_handed_over_to: string;
  cancellation_date: string;
  transaction: string;
  representative: string;
  sno: number | string;
};




const FinanceTable = ({data}:{data: RaisedInvoice[]}) => {
  const {
    isOpen: isModalOpen,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  } = useModal();
  const {
    isOpen: isModalDeleteOpen,
    openModal: handleDeleteOpenModal,
    closeModal: handleDeleteCloseModal,
  } = useModal();
  const {
    isOpen: isModalCancelOpen,
    openModal: handleCancelOpenModal,
    closeModal: handleCancelCloseModal,
  } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const dispatch = useDispatch()
  //@ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    table.getSelectedRowModel().flatRows.map(async (row) => {
      const sno = row.getValue("sno");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/move-settled-invoice-to-trash/${sno}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(updateFormSubmitted(true));
          handleDeleteCloseModal(); 
          toast.success("move to TRASH") // Dispatch the action with fetched data
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Deletion error:", error);
      } finally {
        setDeleteLoading(false);
      }
      
    });
  };

  const handleCancel = () => {
    setCancelLoading(true);
    table.getSelectedRowModel().flatRows.map(async (row) => {
      const sno = row.getValue("sno");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/cancel-settled-invoice/${sno}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(updateFormSubmitted(true));
          handleCancelCloseModal(); 
          toast.success("UPDATED THE STATUS TO CANCEL") // Dispatch the action with fetched data
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.log("Failed to fetch data");
      } finally {
        setCancelLoading(false);
      }
     
    });
  };
  const columns = useMemo<MRT_ColumnDef<RaisedInvoice>[]>(
    () => [
      {
        id: "employee", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorKey: "sno", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "SNo",
            size: 150,
          },
          {
            accessorKey: "invoice_no", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Invoice No",
            size: 150,
          },
          {
            accessorKey: "status",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Status",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell, renderedCellValue }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<string>() === "Shipped"
                      ? theme.palette.success.light
                      : cell.getValue<string>() === "Rejected"
                      ? theme.palette.warning.light
                      : cell.getValue<string>() === "New Order"
                      ? theme.palette.info.main
                      : cell.getValue<string>() === "InProduction"
                      ? theme.palette.primary.light
                      : cell.getValue<string>() === "Cancelled"
                      ? theme.palette.error.light
                      : theme.palette.error.light,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {renderedCellValue}
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.buyers_name}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Buyers Name",
            size: 200,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* <Image
                  alt="avatar"
                  width={30}
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                /> */}
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "buyer_contact", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Buyers Contact",
            size: 200,
          },
          {
            accessorKey: "invoice_generated_name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Invoice Generated Name",
            size: 200,
          },

          {
            accessorFn: (row) => new Date(row.bookinf_date), //convert to Date for sorting and filtering
            id: "invoiceGeneratedDate",
            header: "Invoice Generated Date",
            filterVariant: "date",
            filterFn: "lessThan",
            // sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
          {
            accessorFn: (row) => new Date(row.invoice_date), //convert to Date for sorting and filtering
            id: "invoiceDate",
            header: "Invoice Date",
            filterVariant: "date",
            filterFn: "lessThan",
            // sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
          {
            accessorKey: "invoice_amount",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Invoice Amount",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "gst",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "GST 18%",
            size: 200,
            //custom conditional format and styling
            // Cell: ({ cell }) => (
            //   <Box
            //     component="span"
            //     sx={(theme) => ({
            //       color: "#000",
            //     })}
            //   >
            //     {cell.getValue<number>()?.toLocaleString?.("en-US", {
            //       style: "currency",
            //       currency: "INR",
            //       minimumFractionDigits: 0,
            //       maximumFractionDigits: 0,
            //     })}
            //   </Box>
            // ),
          },
          {
            accessorKey: "tds",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "TDS Deducted",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "amount_after_Tds_Deducted",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "AMOUNT AFTER TDS DEDUCTED",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "final_invoice",
            filterFn: "between",
            header: "FINAL INVOICE",
            size: 200,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "invoice_handed_over_to", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: "autocomplete",
            header: "INVOICE HANDED OVER TO",
            size: 230,
          },
          {
            accessorFn: (row) => new Date(row.cancellation_date), //convert to Date for sorting and filtering
            id: "cancellationDate",
            header: "CANCELLATION DATE",
            filterVariant: "date",
            filterFn: "lessThan",
            // sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
          {
            accessorKey: "transaction", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: "autocomplete",
            header: "TRANSACTION",
            size: 230,
          },
          {
            accessorKey: "representative", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: "autocomplete",
            header: "REPRESENTATIVE",
            size: 230,
          },

          {
            accessorKey: "project_name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: "autocomplete",
            header: "Projects Name",
            size: 230,
          },
          {
            accessorKey: "unit_no", //hey a simple column for once
            header: "Unit No",
            size: 150,
          },
          {
            accessorKey: "settin_representative", //hey a simple column for once
            header: "Settin Representative",
            size: 250,
          },
          {
            accessorKey: "lead_source", //hey a simple column for once
            header: "Lead Source",
            size: 200,
          },
        ],
      },
      {
        id: "id",
        header: "",
        columns: [
          {
            accessorKey: "base_price",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Base Price",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "total_price",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Total Price",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },

          {
            accessorFn: (row) => new Date(row.bookinf_date), //convert to Date for sorting and filtering
            id: "bookingDate",
            header: "Booking Date",
            filterVariant: "date",
            filterFn: "lessThan",
            // sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
          {
            accessorFn: (row) => new Date(row.tentative_date_agreement), //convert to Date for sorting and filtering
            id: "tentativeDateAgreement",
            header: "Tentaive Date of Agreement",
            filterVariant: "date",
            filterFn: "lessThan",
            size: 300,
            // sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
          {
            accessorFn: (row) => new Date(row.tentative_date_recieved), //convert to Date for sorting and filtering
            id: "tentativeDateRecieve",
            header: "Tentaive Date of Payment",
            filterVariant: "date",
            filterFn: "lessThan",
            size: 300,
            // sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
          {
            accessorKey: "total_commissions",
            header: "Total Comissions",
            size: 250,
            Cell: ({ cell }) => <span>{`${cell.getValue<number>()}%`}</span>,
          },
          {
            accessorKey: "cp_commisions",
            header: "CP Commission",
            size: 250,
            Cell: ({ cell }) => <span>{`${cell.getValue<number>()}%`}</span>,
          },
          {
            accessorKey: "discount_offered",
            header: "Discount Offered",
            size: 250,
            Cell: ({ cell }) => <span>{`${cell.getValue<number>()}%`}</span>,
          },
          {
            accessorKey: "revenue",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Revenue",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  color: "#000",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "comment", //hey a simple column for once
            header: "Comment",
            size: 250,
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    // enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    // enableRowActions: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 5
      }
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    // renderDetailPanel: ({ row }) => (
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       justifyContent: 'space-around',
    //       alignItems: 'center',
    //     }}
    //   >
    //     {/* <Image
    //     width={200}
    //       alt="avatar"
    //       height={200}
    //       src={row.original.avatar}
    //       loading="lazy"
    //       style={{ borderRadius: '50%' }}
    //     /> */}
    //     <Box sx={{ textAlign: 'center' }}>
    //       <Typography variant="h4">Signature Catch Phrase:</Typography>
    //       <Typography variant="h1">
    //         &quot;{row.original.signatureCatchPhrase}&quot;
    //       </Typography>
    //     </Box>
    //   </Box>
    // ),
    // renderRowActionMenuItems: ({ closeMenu }) => [
    //   <MenuItem
    //     key={0}
    //     onClick={() => {
    //       // View profile logic...
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <AccountCircle />
    //     </ListItemIcon>
    //     View Profile
    //   </MenuItem>,
    //   <MenuItem
    //     key={1}
    //     onClick={() => {
    //       // Send buyersContact logic...
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <Send />
    //     </ListItemIcon>
    //     Send buyersContact
    //   </MenuItem>,
    // ],
    renderTopToolbar: ({ table }) => {
      const handleCreateNew = () => {
        // // table.getSelectedRowModel().flatRows.map((row) => {
        // //   alert("Create New " + row.getValue("name"));
        // // });handleOpenModal
        // setIsModalOpen(true);
        handleOpenModal();
      };

      const handleDelete = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("Delete " + row.getValue("name"));
        });
      };
      const handleEditTransaction = () => {
        table.getSelectedRowModel().flatRows.map(async (row) => {
          const sno = row.getValue("sno");

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/settled-invoice/${sno}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data.settledInvoice, "transaction data");
            dispatch(setEditSettledInvoiceData(data.settledInvoice));
            handleOpenModal();
            // Dispatch the action with fetched data
          } else {
            console.error("Failed to fetch data");
          }
        });
      };
      const handleSettleInvoice = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          toast.success("Settled Invoice for  " + row.getValue("name"));
        });
      };

      const handlePutBack = () => {
        table.getSelectedRowModel().flatRows.map(async (row) => {
          const sno = row.getValue("sno");
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/move-back-to-raised-invoice/${sno}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              dispatch(updateFormSubmitted(true));
              toast.success("Put back to Raised Invoice"); // Dispatch the action with fetched data
            } else {
              console.error("Failed to fetch data");
            }
          } catch (error) {
            console.log("Failed to fetch data");
          } finally {
            console.log("finally put back to Raised Invoice");
          }
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              
              <Button
                color="success"
                // disabled={!table.getIsSomeRowsSelected()}
                onClick={handleEditTransaction}
                variant="outlined"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 27px",
                  borderRadius: "11px",
                  fontSize: "12px",
                }}
              >
                Edit
              </Button>
              <Button
                color="info"
                onClick={handleClick}
                disabled={!table.getIsSomeRowsSelected()}
                variant="outlined"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 27px",
                  borderRadius: "11px",
                  fontSize: "12px",
                }}
              >
                Option
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDeleteOpenModal}>Delete</MenuItem>
                <MenuItem onClick={handleCancelOpenModal}>Cancel</MenuItem>
                <MenuItem onClick={handlePutBack}>Put Back</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <SettledInvoiceFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        ariaLabelledBy="table2-modal-title"
        ariaDescribedBy="table2-modal-description"
      />
      <DeleteModal
        open={isModalDeleteOpen}
        onClose={handleDeleteCloseModal}
        ariaLabelledBy="delete-modal-title"
        ariaDescribedBy="delete-modal-description"
        handleClick={handleDelete}
        loading={deleteLoading}
      />
      <CancelModal
        open={isModalCancelOpen}
        onClose={handleCancelCloseModal}
        ariaLabelledBy="cancel-modal-title"
        ariaDescribedBy="cancel-modal-description"
        handleClick={handleCancel}
        loading={cancelLoading}
      />
    </>
  );
};
//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import LeadFormModal from "../Modal/Modal";
import { useModal } from "@/hooks/useModal";
import DeleteModal from "../Modal/DeleteModal";
import CancelModal from "../Modal/CancelModal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setEditRaisedInvoiceData } from "@/redux/slices/RaisedInvoiceForm";
import { setEditSettledInvoiceData, updateFormSubmitted } from "@/redux/slices/SettledInvoiceFormSlice";
import SettledInvoiceFormModal from "../Modal/SettledInvoiceModal";

const FinanceTableOfSettledInvoice = ({data}:{data:RaisedInvoice[]}) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <FinanceTable data={data} />
  </LocalizationProvider>
);

export default FinanceTableOfSettledInvoice;
