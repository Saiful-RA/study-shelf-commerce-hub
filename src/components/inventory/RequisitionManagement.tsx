
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Plus, Package } from 'lucide-react';

export const RequisitionManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Requisition Slip
            </CardTitle>
            <CardDescription>Create and manage material requisitions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Requisition
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Issue Requisition Materials
            </CardTitle>
            <CardDescription>Issue materials against approved requisitions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Issue Materials
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requisitions</CardTitle>
          <CardDescription>Requisitions awaiting approval or fulfillment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ClipboardList className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No pending requisitions</h3>
            <p className="text-muted-foreground">All requisitions are up to date</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
