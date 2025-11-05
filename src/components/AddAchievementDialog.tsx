import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface AddAchievementDialogProps {
  onAchievementAdded?: () => void;
}

export function AddAchievementDialog({ onAchievementAdded }: AddAchievementDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    achievementTitle: "",
    category: "",
    level: "",
    achievementDate: "",
    description: "",
    addedBy: "Admin"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("achievements").insert({
        student_name: formData.studentName,
        student_id: formData.studentId,
        achievement_title: formData.achievementTitle,
        category: formData.category,
        level: formData.level,
        achievement_date: formData.achievementDate,
        description: formData.description,
        added_by: formData.addedBy
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Achievement added successfully",
      });

      setFormData({
        studentName: "",
        studentId: "",
        achievementTitle: "",
        category: "",
        level: "",
        achievementDate: "",
        description: "",
        addedBy: "Admin"
      });

      setOpen(false);
      onAchievementAdded?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Achievement</DialogTitle>
          <DialogDescription>
            Record a new student achievement to the system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                placeholder="e.g., Sarah Johnson"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="e.g., ST2024001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievementTitle">Achievement Title *</Label>
            <Input
              id="achievementTitle"
              required
              value={formData.achievementTitle}
              onChange={(e) => setFormData({ ...formData, achievementTitle: e.target.value })}
              placeholder="e.g., Science Fair Winner"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                required
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sports">Sports & Athletics</SelectItem>
                  <SelectItem value="Academic">Academic Excellence</SelectItem>
                  <SelectItem value="Arts">Arts & Performance</SelectItem>
                  <SelectItem value="Community Service">Community Service</SelectItem>
                  <SelectItem value="Leadership">Leadership & Clubs</SelectItem>
                  <SelectItem value="STEM">STEM & Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level *</Label>
              <Select
                required
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="District">District</SelectItem>
                  <SelectItem value="State">State</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievementDate">Achievement Date *</Label>
            <Input
              id="achievementDate"
              type="date"
              required
              value={formData.achievementDate}
              onChange={(e) => setFormData({ ...formData, achievementDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about the achievement..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Achievement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
