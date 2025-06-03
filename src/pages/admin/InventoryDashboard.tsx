
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Users, 
  FileText, 
  ClipboardList,
  Settings,
  Truck,
  ShoppingCart,
  BarChart3
} from 'lucide-react';
import { MaterialGroupManagement } from '@/components/inventory/MaterialGroupManagement';
import { MaterialTypeManagement } from '@/components/inventory/MaterialTypeManagement';
import { MaterialManagement } from '@/components/inventory/MaterialManagement';
import { SupplierManagement } from '@/components/inventory/SupplierManagement';
import { QuotationManagement } from '@/components/inventory/QuotationManagement';
import { RequisitionManagement } from '@/components/inventory/RequisitionManagement';
import { MaterialReceiving } from '@/components/inventory/MaterialReceiving';
import { InventoryReports } from '@/components/inventory/InventoryReports';

export const InventoryDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management System</h1>
        <p className="text-muted-foreground">Comprehensive inventory and materials management</p>
      </div>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="receiving">Receiving</TabsTrigger>
          <TabsTrigger value="balance">Balance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MaterialGroupManagement />
            <MaterialTypeManagement />
            <MaterialManagement />
          </div>
        </TabsContent>

        <TabsContent value="suppliers">
          <SupplierManagement />
        </TabsContent>

        <TabsContent value="quotations">
          <QuotationManagement />
        </TabsContent>

        <TabsContent value="requisitions">
          <RequisitionManagement />
        </TabsContent>

        <TabsContent value="receiving">
          <MaterialReceiving />
        </TabsContent>

        <TabsContent value="balance">
          <div className="text-center py-8">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Materials Opening Balance</h3>
            <p className="text-muted-foreground">Set opening balance for materials across branches</p>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <InventoryReports />
        </TabsContent>

        <TabsContent value="settings">
          <div className="text-center py-8">
            <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Inventory Settings</h3>
            <p className="text-muted-foreground">Configure inventory system settings</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
