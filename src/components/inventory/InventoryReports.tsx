
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Download } from 'lucide-react';

export const InventoryReports: React.FC = () => {
  const reports = [
    { name: 'Stock Level Report', description: 'Current stock levels across all branches' },
    { name: 'Low Stock Alert', description: 'Materials below reorder level' },
    { name: 'Supplier Performance', description: 'Supplier delivery and quality metrics' },
    { name: 'Material Movement', description: 'Material issue and receipt history' },
    { name: 'Quotation Summary', description: 'Quotation status and analysis' },
    { name: 'Requisition Report', description: 'Requisition patterns and fulfillment' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Inventory Reports
          </CardTitle>
          <CardDescription>Generate comprehensive inventory reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">{report.name}</CardTitle>
                  <CardDescription className="text-xs">{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
