'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit, Trash2, Plus, ListPlus } from 'lucide-react';
import { courseService } from '@/services/course/course.service';

interface Module {
  id: string;
  title: string;
}

interface ModulesListProps {
  modules: Module[];
  courseId: string;
}

export const ModulesList = ({ modules, courseId }: ModulesListProps) => {
  const router = useRouter();

  // Dialog Visibility States
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInsertAfterOpen, setIsInsertAfterOpen] = useState(false);

  // Form/Input States
  const [newTitle, setNewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Click Handlers ---

  const handleEditClick = (module: Module) => {
    setSelectedModule(module);
    setNewTitle(module.title);
    setIsEditDialogOpen(true);
  };

  const handleInsertClick = (module: Module) => {
    setSelectedModule(module);
    setNewTitle(''); // Clear for new entry
    setIsInsertAfterOpen(true);
  };

  const handleDeleteClick = (module: Module) => {
    setSelectedModule(module);
    setIsDeleteDialogOpen(true);
  };

  // --- API Actions ---

  const onUpdate = async () => {
    if (!selectedModule || !newTitle.trim()) return;
    const toastId = 'updating-module';
    setIsSubmitting(true);
    try {
      toast.loading('Updating module title...', { id: toastId });
      const res = await courseService.updateModule(selectedModule.id, newTitle);

      if (res.error) throw new Error(res.error.message);

      toast.success('Module updated successfully', { id: toastId });
      setIsEditDialogOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Update failed', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInsertAfter = async () => {
    if (!selectedModule || !newTitle.trim()) return;
    const toastId = 'inserting-module';
    setIsSubmitting(true);
    try {
      toast.loading('Inserting new module...', { id: toastId });
      // This sends the current module ID as the "target" for the backend logic
      const res = await courseService.insertModule(selectedModule.id, newTitle);

      if (res.error) throw new Error(res.error.message);

      toast.success('Module inserted successfully', { id: toastId });
      setIsInsertAfterOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Insertion failed', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    if (!selectedModule) return;
    const toastId = 'deleting-module';
    try {
      toast.loading('Deleting module...', { id: toastId });
      const res = await courseService.deleteModule(selectedModule.id);

      if (res.error) throw new Error(res.error.message);

      toast.success('Module deleted', { id: toastId });
      setIsDeleteDialogOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Delete failed', { id: toastId });
    }
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-slate-900">
        Course Modules
      </h2>

      {modules.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            No modules created yet.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {modules.map((module) => (
          <div
            key={module.id}
            className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors group"
          >
            <div className="mb-3 md:mb-0">
              <p className="font-medium text-slate-800">{module.title}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/instructor-dashboard/all-courses/${courseId}/${module.id}`}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Lecture
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleInsertClick(module)}
                className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <ListPlus className="w-3.5 h-3.5 mr-1" />
                Insert
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditClick(module)}
                className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900"
              >
                <Edit className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteClick(module)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Dialog: Edit --- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Module Name</DialogTitle>
            <DialogDescription>
              Update the title for this module.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Intermediate TypeScript"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={onUpdate} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Dialog: Insert After --- */}
      <Dialog open={isInsertAfterOpen} onOpenChange={setIsInsertAfterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert New Module</DialogTitle>
            <DialogDescription>
              This module will be placed right after **"{selectedModule?.title}
              "**.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">New Module Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter module name"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInsertAfterOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={onInsertAfter}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Inserting...' : 'Insert Module'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Dialog: Delete --- */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Permanently Delete Module?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete **"{selectedModule?.title}"**?
              This action cannot be undone and will remove all associated
              content.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
