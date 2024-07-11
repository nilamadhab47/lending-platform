//@ts-nocheck
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Input } from "../ui/input";
import MultipleSelectCheckmarks from "../ui/MutlipleSelect";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@/constants/TableConstants";
import { LeadSource } from "@/constants/TableConstants";
import { variants } from "@/constants/TableConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { seteditAllTransactionData, updateFormSubmitted } from "@/redux/slices/RaisedInvoiceForm";

export type RaisedInvoiceData = {
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
interface RaisedInvoiceFormProps {
  onSubmit: () => void;
  onSuccess: () => void; 
}

export default function AllTransactionPropsTextFields({ onSubmit , onSuccess }: RaisedInvoiceFormProps) {
  const dispatch = useDispatch()
  const editAllTransactionData = useSelector((state: RootState) => state.allTransactionForm.editAllTransactionData);

  console.log(editAllTransactionData)

  const [representative, setRepresentative] = React.useState("");
  const [leadSource, setLeadSource] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const schema = z.object({
    buyer_contact: z.string().min(1),
    buyers_name: z.string().min(2).max(80),
    // settinRepresentative: z.string().min(2).max(8),
    // leadSource: z.string().min(2).max(8),
    // projectsName: z.string().min(2).max(20),
    unit_no: z.string().min(4).max(20),
    base_price: z.number().min(3),
    total_price: z.number().min(3),
    bookinf_date: z.date(),
    tentative_date_agreement: z.date(),
    advanced_paid: z.number().min(2),
    tentative_date_received: z.date(),
    total_commissions: z.number().min(1),
    cp_commissions: z.number().min(1),
    discount_offered: z.number().min(1),
    revenue: z.number().min(1),
    tranche: z.string().min(2).max(8),
    // status: z.string().min(2).max(8),
    comment: z.string().min(2).max(200),
    // sNo: z.number().min(2).max(8),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RaisedInvoiceData>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    if (editAllTransactionData) {
      Object.keys(editAllTransactionData).forEach(key => {
        setValue(key, editAllTransactionData[key]);
      });
  
      // Assuming editAllTransactionData contains keys like 'representative', 'leadSource', 'projectName', and 'status'
      // and these keys directly map to the values you want to set.
      if (editAllTransactionData.representative) setRepresentative(editAllTransactionData.representative);
      if (editAllTransactionData.lead_source) setLeadSource(editAllTransactionData.lead_source);
      if (editAllTransactionData.project_name) setProjectName(editAllTransactionData.project_name);
      if (editAllTransactionData.status) setStatus(editAllTransactionData.status);
    }
  }, [editAllTransactionData, setValue, setRepresentative, setLeadSource, setProjectName, setStatus]);

  const handleCloseForm = () => {
    reset(); // Reset form fields to default values
    dispatch(seteditAllTransactionData(null)); // Reset editAllTransactionData in Redux
    onSuccess(); // Close the form modal
  };

  const handleFormSubmit = async (data: FormData) => {
    const randomSNo = Math.floor(10000 + Math.random() * 90000);
    const formDataWithVariants = {
      ...data,
      settin_representative: representative.name,
      lead_source: leadSource.name,
      project_name: projectName.name,
      status: status.name,
      s_no: randomSNo,
    };
    if (editAllTransactionData !== null) {
      // Update existing entry
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/all-transactions/${editAllTransactionData.sno}`, {
          method: 'PUT', // or 'PATCH'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithVariants),
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        // Handle success
        toast.success('Entry updated successfully!');
        // Optionally, dispatch an action to update the Redux store
        dispatch(updateFormSubmitted(true));
        handleCloseForm()
      } catch (error) {
        console.error('Failed to update entry:', error);
        toast.error('Failed to update entry.');
      }
    } else {
      // Create new entry
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/ledger-service/active-transaction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithVariants),
        });

        if (!response.ok) throw new Error('Network response was not ok0n');

        // Handle success
        toast.success('Entry created successfully!');
        // Optionally, dispatch an action to update the Redux store
        dispatch(updateFormSubmitted(true));
        onSuccess();
      } catch (error) {
        console.error('Failed to create entry:', error);
        toast.error('Failed to create entry.');
      }
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h3 className=" w-full pb-4 px-8 pt-4 bg-formHeadingColor">Edit Form</h3>
      <div
        style={{
          width: "100%",
          padding: "16px",
        }}
      >
        <div className="">
          <div className=" flex w-full justify-between items-center">
            <div className="topTwoFields w-1/2">
              <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
                <Label htmlFor="contact">Buyers Contact</Label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  id="contact"
                  placeholder="80343480"
                  {...register("buyer_contact")}
                />
                {errors.buyer_contact && <span className="">error</span>}
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Buyers Name</Label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  id="name"
                  placeholder="name ..."
                  {...register("buyers_name")}
                />
                {errors.buyers_name && <span className="">eroor</span>}
              </div>
            </div>
            <div className=" w-1/3">
              <Button variant="outline" className=" px-8">
                AutoFill Info
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <InputLabel id="Representative">Representative</InputLabel>
              <Select
               className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                labelId="Representative"
                id="Representative"
                value={representative}
                label=" Representative"
                onChange={(event) => setRepresentative(event.target.value)}
              >
                {variants.map((variant) => (
                  <MenuItem key={variant} value={variant}>
                    {variant.name}
                  </MenuItem>
                ))}
              </Select>
              {" "}
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <InputLabel id="Lead">Lead Source</InputLabel>
              <Select
               className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                labelId="Lead"
                id="Lead"
                value={leadSource}
                label="Lead"
                onChange={(event) => setLeadSource(event.target.value)}
              >
                {variants.map((variant) => (
                  <MenuItem key={variant} value={variant}>
                    {variant.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <InputLabel id="Project Name/ID">Project Name/ID</InputLabel>
              <Select
               className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                labelId="Project Name/ID"
                id="Project Name/ID-select"
                value={projectName}
                label="Project Name/ID"
                onChange={(event) => setProjectName(event.target.value)}
              >
                {variants.map((variant) => (
                  <MenuItem key={variant} value={variant}>
                    {variant.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Unit No.</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="base"
                placeholder="80343480"
                {...register("unit_no")}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Base Price</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="base"
                placeholder="80343480"
                {...register("base_price", { valueAsNumber: true })}
              />
              {errors.base_price && <span>error</span>}
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Total Price</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="base"
                placeholder="80343480"
                {...register("total_price", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <TextField
                style={{ width: " 100%", margin: 0 }}
                id="date"
                label="Booking Date"
                type="date" 
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                {...register("bookinf_date", { valueAsDate: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <TextField
                id="date"
                label="Tentative date of agreement"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: " 100%", margin: 0}}
                variant="outlined"
                {...register("tentative_date_agreement", { valueAsDate: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Advancement Payment</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="base"
                placeholder="Rs 123450"
                {...register("advanced_paid", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <TextField
                style={{ width: " 100%", margin: 0 }}
                id="date"
                label="Tentative date to recieve 1st payments"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                {...register("tentative_date_received", { valueAsDate: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Total Comission</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="%"
                {...register("total_commissions", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">CP Comission</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="%"
                {...register("cp_commissions", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Discount Offered</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="%"
                {...register("discount_offered", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Revenue</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="%"
                {...register("revenue", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Invoice Generated Name</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="Comission"
                placeholder="%"
                {...register("invoice_generated_name", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <TextField
                id="date"
                label="Invoice Generated Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: " 100%", margin: 0}}
                variant="outlined"
                {...register("invoice_generated_date", { valueAsDate: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <TextField
                id="date"
                label="Invoice Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: " 100%", margin: 0}}
                variant="outlined"
                {...register("invoice_date", { valueAsDate: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Invoice Amount</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="&#8377;"
                {...register("invoice_amount", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">GST</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="....%"
                {...register("gst", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">TDS</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="....%"
                {...register("tds", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Amount After Tds Deducted</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder="&#8377;"
                {...register("amount_after_Tds_Deducted", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Final Invoice</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="Comission"
                placeholder=".....%"
                {...register("final_invoice", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Invoice handed Over To</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="Comission"
                placeholder="name ..."
                {...register("invoice_handed_over_to", { valueAsNumber: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <TextField
                id="date"
                label="Cancellation Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: " 100%", margin: 0}}
                variant="outlined"
                {...register("cancellation_date", { valueAsDate: true })}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="Comission">Transaction</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="Comission"
                placeholder="%"
                {...register("transaction")}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <Label htmlFor="Comission">Tranche</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="Comission"
                placeholder="%"
                {...register("tranche")}
              />
            </div>
            <div className="grid w-full mb-4 max-w-sm items-center gap-1.5">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
               className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                labelId="status-select-label"
                id="status-select"
                value={status}
                label="Status"
                onChange={(event) => setStatus(event.target.value)}
              >
                {Status.map((statusOption) => (
                  <MenuItem key={statusOption} value={statusOption}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              type="text"
              label="Comment"
              multiline
              rows={6}
              maxRows={0}
              style={{
                width: "48%",
                margin: "2rem 0",
              }}
              {...register("comment")}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="outline"
          className=" w-1/6 p-4 hover:bg-black hover:text-white"
          style={{ border: "1px solid black" }}
        >
          Generate Lead
        </Button>
      </div>
    </Box>
  );
}
