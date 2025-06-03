
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Package } from 'lucide-react';
import { Material } from '@/types/inventory';

export const MaterialManagement: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Dell Laptop',
      code: 'DELL-L001',
      typeId: '1',
      groupId: '1',
      description: 'Dell Inspiron 15 3000 Series',
      unit: 'pcs',
      minStockLevel: 5,
      maxStockLevel: 50,
      reorderLevel: 10,
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    code: '', 
    typeId: '', 
    description: '', 
    minStockLevel: 0,
    maxStockLevel: 0,
    reorderLevel: 0
  });

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code,
      typeId: formData.typeId,
      groupId: '1', // This would be derived from typeId in real implementation
      description: formData.description,
      unit: 'pcs', // This would be derived from typeId in real implementation
      minStockLevel: formData.minStockLevel,
      maxStockLevel: formData.maxStockLevel,
      reorderLevel: formData.reorderLevel,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setMaterials([...materials, newMaterial]);
    setFormData({ 
      name: '', 
      code: '', 
      typeId: '', 
      description: '', 
      minStockLevel: 0,
      maxStockLevel: 0,
      reorderLevel: 0
    });
    setIsAddOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Materials
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="materialName">Material Name</Label>
                  <Input
                    id="materialName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter material name"
                  />
                </div>
                <div>
                  <Label htmlFor="materialCode">Material Code</Label>
                  <Input
                    id="materialCode"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Enter material code"
                  />
                </div>
                <div>
                  <Label htmlFor="materialType">Material Type</Label>
                  <Select value={formData.typeId} onValueChange={(value) => setFormData({ ...formData, typeId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Computers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="materialDescription">Description</Label>
                  <Input
                    id="materialDescription"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStockLevel}
                      onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={formData.maxStockLevel}
                      onChange={(e) => setFormData({ ...formData, maxStockLevel: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                    <Input
                      id="reorderLevel"
                      type="number"
                      value={formData.reorderLevel}
                      onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddMaterial} className="w-full">
                  Add Material
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>Manage individual materials and their specifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Stock Levels</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{material.name}</p>
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{material.code}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>Min: {material.minStockLevel}</p>
                    <p>Max: {material.maxStockLevel}</p>
                    <p>Reorder: {material.reorderLevel}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={material.isActive ? 'default' : 'secondary'}>
                    {material.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
