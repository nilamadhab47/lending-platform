"use client";

import { useEffect, useMemo, useState } from "react";

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
// import { data } from "@/constants/makeData2";

import { Employee, Project } from "@/types/EmplyeeTypes";



const FinanceTable = ({data}:{data: Project[]}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalDeleteOpen, setisModalDeleteOpen] = useState(false);
  // const [isModaCancelOpen, setisModaCancelOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  //@ts-ignore

  const { isOpen: isModalOpen, openModal: handleOpenModal, closeModal: handleCloseModal } = useModal();
  const { isOpen: isModalDeleteOpen, openModal: handleDeleteOpenModal, closeModal: handleDeleteCloseModal } = useModal();
  const { isOpen: isModalCancelOpen, openModal: handleCancelOpenModal, closeModal: handleCancelCloseModal } = useModal();
  //@ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Add your delete logic here
    handleClose();
  };

  const handleCancel = () => {
    // Add your cancel logic here
    handleClose();
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleDeleteOpenModal = () => {
  //   setisModalDeleteOpen(true);
  // };

  // const handleDeleteCloseModal = () => {
  //   setisModalDeleteOpen(false);
  // };
  // const handleCancelOpenModal = () => {
  //   setisModaCancelOpen(true);
  // };

  // const handleCancelCloseModal = () => {
  //   setisModaCancelOpen(false);
  // };



  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      {
        id: "employee", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorKey: "s_no", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "SNo",
            size: 150,
          },
          {
            accessorKey: "developers_name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "DEVELOPERS'S NAME",
            size: 150,
          },
        
          {
            accessorKey: "projects_name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            filterVariant: "autocomplete",
            header: "PROJECT NAME",
            size: 230,
          },
          {
            accessorKey: "era_id", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "RERA ID",
            size: 200,
          },
          {
            accessorKey: "area", //hey a simple column for once
            header: "AREA",
            size: 150,
          },
          {
            accessorFn: (row) => new Date(row.completion_date), //convert to Date for sorting and filtering
            id: "completiondate",
            header: "COMPLETION DATE",
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
            accessorKey: "no_of_units", //hey a simple column for once
            header: "NO OF UNITS",
            size: 250,
          },
          {
            accessorKey: "representatives", //hey a simple column for once
            header: "REPRESENTATIVE",
            size: 200,
            // Cell: ({ cell }) => {
            //   let leadSourceData = { selectedVariants1: [] }; // Default structure if parsing fails or value is not a string
            //   const cellValue = cell.getValue();
            //   console.log(cellValue)
            //   if (Array.isArray(cellValue)) {
            //     const leadSourceNames = leadSourceData.selectedVariants1
            //     .map((variant: { name: string }) => variant.name)
            //     .join(", ");

            //     console.log(leadSourceNames, "sadsda")
            //   return leadSourceNames;
            //   }

            //   return <span>{cellValue as String || 'N/A'}</span>;

            // },
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
            accessorKey: "total_commissions",
            header: "Total Comissions",
            size: 250,
            Cell: ({ cell }) => <span>{`${cell.getValue<number>()}%`}</span>,
          },
          {
            accessorKey: "gst",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "GST 18%",
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
            accessorKey: "invoice_generated_name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Invoice Generated Name",
            size: 200,
          },
          {
            accessorKey: "incorporated_name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "INCORPORATED NAME",
            size: 200,
          },

         
          {
            accessorFn: (row) => new Date(row.year), //convert to Date for sorting and filtering
            id: "year",
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
            accessorKey: "type", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "TYPE",
            size: 200,
          },
          {
            accessorKey: "contact", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "CONTACT",
            size: 200,
          },
          {
            accessorKey: "gmail_id", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "GMAIL ID",
            size: 200,
          },
          
          {
            accessorKey: "comments", //hey a simple column for once
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

      const handleRaiseInvoice = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          toast.success("Raised Invoice for  " + row.getValue("name"));
        });
      };

      const handleDelete = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          toast.success("Delete " + row.getValue("name"));
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
                onClick={handleOpenModal}
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 27px",
                  borderRadius: "11px",
                  fontSize: "12px",
                }}
              >
                + Add New Project
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleCreateNew}
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
      <LeadFormModal
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
       handleClick={handleCancelCloseModal}
       loading={deleteLoading}
      />
    </>
  );
};

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import LeadFormModal from "../Modal/Modal";
import { array } from "zod";
import DeleteModal from "../Modal/DeleteModal";
import CancelModal from "../Modal/CancelModal";
import { toast } from "react-toastify";
import { useModal } from "@/hooks/useModal";
// import { ProjectData } from "@/constants/ProjectData";

const ProjectTableWithLocalizationProvider = ({data}:{data:Project[]}) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <FinanceTable data={data}/>
  </LocalizationProvider>
);

export default ProjectTableWithLocalizationProvider;
