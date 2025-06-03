
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Package, RotateCcw } from 'lucide-react';

export const MaterialReceiving: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Receive Against Quotation
            </CardTitle>
            <CardDescription>Receive materials from approved quotations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Truck className="h-4 w-4 mr-2" />
              Receive Materials
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Direct Materials Receive
            </CardTitle>
            <CardDescription>Direct receipt of materials without quotation</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Direct Receive
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RotateCcw className="h-5 w-5 mr-2" />
              Return Materials
            </CardTitle>
            <CardDescription>Return materials to suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Return Materials
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Receipts</CardTitle>
          <CardDescription>Latest material receiving activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Truck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No recent receipts</h3>
            <p className="text-muted-foreground">Material receiving history will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
