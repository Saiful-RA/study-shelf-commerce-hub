
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockBranches } from '@/data/mockData';
import { Branch } from '@/types';
import { Building, Plus, Edit, MapPin, Phone } from 'lucide-react';

export const BranchManagement: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [newBranch, setNewBranch] = useState({
    name: '',
    location: '',
    contact: ''
  });

  const handleAddBranch = () => {
    const branch: Branch = {
      id: `branch${branches.length + 1}`,
      name: newBranch.name,
      location: newBranch.location,
      contact: newBranch.contact
    };
    
    setBranches([...branches, branch]);
    setNewBranch({ name: '', location: '', contact: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditBranch = () => {
    if (!editingBranch) return;
    
    setBranches(branches.map(branch => 
      branch.id === editingBranch.id ? editingBranch : branch
    ));
    setIsEditDialogOpen(false);
    setEditingBranch(null);
  };

  const openEditDialog = (branch: Branch) => {
    setEditingBranch({ ...branch });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Branch Management</h1>
          <p className="text-muted-foreground">Manage store branches and locations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
              <DialogDescription>
                Create a new branch location for your bookstore
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branch-name">Branch Name</Label>
                <Input
                  id="branch-name"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  placeholder="Enter branch name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch-location">Location</Label>
                <Input
                  id="branch-location"
                  value={newBranch.location}
                  onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
                  placeholder="Enter branch address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch-contact">Contact</Label>
                <Input
                  id="branch-contact"
                  value={newBranch.contact}
                  onChange={(e) => setNewBranch({ ...newBranch, contact: e.target.value })}
                  placeholder="Enter contact number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBranch}>Add Branch</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branches.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{branches.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage Areas</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{branches.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Branches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Locations</CardTitle>
          <CardDescription>
            Manage all your bookstore branch locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{branch.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{branch.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{branch.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(branch)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Branch Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogDescription>
              Update branch information
            </DialogDescription>
          </DialogHeader>
          {editingBranch && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-branch-name">Branch Name</Label>
                <Input
                  id="edit-branch-name"
                  value={editingBranch.name}
                  onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-branch-location">Location</Label>
                <Input
                  id="edit-branch-location"
                  value={editingBranch.location}
                  onChange={(e) => setEditingBranch({ ...editingBranch, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-branch-contact">Contact</Label>
                <Input
                  id="edit-branch-contact"
                  value={editingBranch.contact}
                  onChange={(e) => setEditingBranch({ ...editingBranch, contact: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBranch}>Update Branch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
