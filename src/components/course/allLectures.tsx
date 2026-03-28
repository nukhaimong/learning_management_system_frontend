'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Play, X } from 'lucide-react';
import { courseService } from '@/services/course/course.service';

interface LectureData {
  id: string;
  title: string;
  module_id: string;
  video_url: string;
}

interface AllLecturesProps {
  lectures: LectureData[];
  onLectureUpdate?: () => void;
}

export default function AllLectures({
  lectures,
  onLectureUpdate,
}: AllLecturesProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<LectureData | null>(
    null,
  );
  const [editingTitle, setEditingTitle] = useState('');
  const [editingVideoFile, setEditingVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteClick = (lecture: LectureData) => {
    setSelectedLecture(lecture);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (lecture: LectureData) => {
    setSelectedLecture(lecture);
    setEditingTitle(lecture.title);
    setEditingVideoFile(null); // Reset file selection
    setEditDialogOpen(true);
  };

  const handlePlayClick = (lecture: LectureData) => {
    setSelectedLecture(lecture);
    setVideoModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLecture) return;

    const toastId = 'deleting-lecture';
    try {
      toast.loading('Deleting lecture...', { id: toastId });
      const res = await courseService.deleteLecture(selectedLecture.id);

      if (res.error) {
        toast.error(res.error.message || 'Failed to delete lecture', {
          id: toastId,
        });
        return;
      }

      toast.success('Lecture deleted successfully', { id: toastId });
      setDeleteDialogOpen(false);
      setSelectedLecture(null);
      router.refresh();
      onLectureUpdate?.();
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error', { id: toastId });
    }
  };

  const confirmEdit = async () => {
    if (!selectedLecture) return;

    const toastId = 'editing-lecture';
    setIsSubmitting(true);

    try {
      toast.loading('Updating lecture...', { id: toastId });

      const formData = new FormData();

      // Only append title if it has changed
      if (editingTitle !== selectedLecture.title) {
        formData.append('title', editingTitle);
      }

      // Only append video file if a new one is selected
      if (editingVideoFile) {
        formData.append('video_url', editingVideoFile);
      }

      const res = await courseService.updateLecture(
        selectedLecture.id,
        formData,
      );

      if (res.error) {
        toast.error(res.error.message || 'Failed to update lecture', {
          id: toastId,
        });
        return;
      }

      toast.success('Lecture updated successfully', { id: toastId });
      setEditDialogOpen(false);
      setSelectedLecture(null);
      setEditingVideoFile(null);
      router.refresh();
      onLectureUpdate?.();
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (lectures.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No lectures yet. Create your first lecture!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">All Lectures</h2>
        <div className="grid gap-4">
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {lecture.title}
                  </h3>
                  <p className="text-sm text-gray-500 break-all">
                    Video URL: {lecture.video_url}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlayClick(lecture)}
                    className="gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(lecture)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(lecture)}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedLecture?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedLecture?.video_url && (
              <video
                controls
                autoPlay
                className="w-full rounded-md"
                src={selectedLecture.video_url}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lecture</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedLecture?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lecture Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lecture</DialogTitle>
            <DialogDescription>
              Make changes to your lecture here. Leave fields blank to keep
              current values.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Lecture Title (Optional)
              </label>
              <Input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                placeholder="Leave blank to keep current title"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current: {selectedLecture?.title}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Video File (Optional)
              </label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setEditingVideoFile(file);
                }}
              />
              {editingVideoFile && (
                <p className="text-xs text-green-600 mt-1">
                  New video selected: {editingVideoFile.name} (
                  {(editingVideoFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Current video:{' '}
                {selectedLecture?.video_url?.split('/').pop() || 'No video'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
