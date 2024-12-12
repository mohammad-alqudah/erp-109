export interface Branch {
  id: number;
  name: string;
}

export interface BranchPermissions {
  "100_product": boolean;
  "200_customers": boolean;
  "300_messaging": boolean;
  "400_inventory": boolean;
  "G1_manual_scan": boolean;
}

export interface BranchPermissionsResponse {
  data: BranchPermissions;
  status: boolean;
  detail: null | string;
}

export interface BranchesResponse {
  data: Branch[];
  status: boolean;
  detail: null | string;
}