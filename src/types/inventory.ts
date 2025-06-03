
export interface MaterialGroup {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface MaterialType {
  id: string;
  name: string;
  groupId: string;
  description: string;
  unit: string;
  isActive: boolean;
  createdAt: string;
}

export interface Material {
  id: string;
  name: string;
  code: string;
  typeId: string;
  groupId: string;
  description: string;
  unit: string;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
  specification?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
  panNumber?: string;
  isActive: boolean;
  assignedMaterials: string[];
  assignedBranches: string[];
  createdAt: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  supplierId: string;
  branchId: string;
  requestDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'received' | 'approved' | 'rejected';
  items: QuotationItem[];
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

export interface QuotationItem {
  id: string;
  materialId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: string;
}

export interface RequisitionSlip {
  id: string;
  requisitionNumber: string;
  branchId: string;
  requestedBy: string;
  requestDate: string;
  requiredDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'issued';
  items: RequisitionItem[];
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
  createdAt: string;
}

export interface RequisitionItem {
  id: string;
  materialId: string;
  requestedQuantity: number;
  approvedQuantity?: number;
  issuedQuantity?: number;
  purpose: string;
}

export interface MaterialBalance {
  id: string;
  materialId: string;
  branchId: string;
  openingBalance: number;
  currentBalance: number;
  reservedQuantity: number;
  lastUpdated: string;
}
