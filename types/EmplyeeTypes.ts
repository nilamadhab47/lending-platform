export type Employee = {
  buyers_name: string;
  buyer_contact: string | number;
  settin_representative: string;
  lead_source: string;
  project_name: string;
  unit_no: string;
  base_price: number;
  total_price: number;
  bookinf_date: string;
  tentative_date_agreement: string;
  advanced_paid: number;
  tentative_date_received: string;
  total_commissions: number;
  cp_commissions: number;
  discount_offered: number;
  revenue: number;
  tranche: string;
  status: string;
  comment: string;
  s_no: number | string;
};

  // type ActiveTransaction struct {
  //   BuyerContact           string `json:"buyer_contact" bson:"buyer_contact"`
  //   BuyersName             string `json:"buyers_name" bson:"buyers_name"`
  //   SettinRepresentative   string `json:"settin_representative" bson:"representative"`
  //   LeadSource             string `json:"lead_source" bson:"lead_source"`
  //   ProjectName            string `json:"project_name" bson:"project_name"`
  //   UnitNo                 string `json:"unit_no" bson:"unit_no"`
  //   BasePrice              int    `json:"base_price" bson:"base_price"`
  //   TotalPrice             int    `json:"total_price" bson:"total_price"`
  //   BookinfDate            string `json:"bookinf_date" bson:"bookinf_date"`
  //   TentativeDateAgreement string `json:"tentative_date_agreement" bson:"tentative_date_agreement"`
  //   AdvancedPaid           int    `json:"advanced_paid" bson:"advanced_paid"`
  //   TentativeDateRecieved  string `json:"tentative_date_recieved" bson:"tentative_date_recieved"`
  //   TotalCommissions       int    `json:"total_commissions" bson:"total_commissions"`
  //   CpCommissions          int    `json:"cp_commisions" bson:"cp_commission"`
  //   DiscountOffered        int    `json:"discount_offered" bson:"discount_offered"`
  //   Revenue                int    `json:"revenue" bson:"revenue"`
  //   Tranche                string `json:"tranche" bson:"tranche"`
  //   Status                 string `json:"status" bson:"status"`
  //   Comment                string `json:"comment" bson:"comment"`
  //   Sno                    string `json:"sno" bson:"sno"`
  // }
  export type Project = {
    developers_name: string;
    projects_name: string;
    era_id: string;
    area: string;
    completion_date: string;
    no_of_units: number;
    representatives: number | string;
    base_price: number;
    total_commissions: number;
    gst: number | string;
    invoice_generated_name: string;
    incorporated_name: string;
    year: number | string;
    type: number | string;
    contact: number;
    gmail_id: string;
    comments: string;
    sno: number | string;
};

  