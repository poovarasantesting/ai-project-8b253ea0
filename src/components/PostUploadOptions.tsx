import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookmarkPlus, 
  Share2, 
  Bell, 
  Globe, 
  Lock, 
  Users 
} from "lucide-react";

interface PostUploadOptionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export function PostUploadOptions({ onSave, onCancel }: PostUploadOptionsProps) {
  const { toast } = useToast();
  const [isPublic, setIsPublic] = React.useState(true);
  const [enableComments, setEnableComments] = React.useState(true);
  const [notifyFollowers, setNotifyFollowers] = React.useState(true);
  
  const handleSave = () => {
    toast({
      title: "Post saved",
      description: "Your post has been saved successfully",
    });
    onSave();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Post Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isPublic ? <Globe className="h-5 w-5 text-gray-500" /> : <Lock className="h-5 w-5 text-gray-500" />}
            <Label htmlFor="public-switch">
              {isPublic ? "Public" : "Private"}
            </Label>
          </div>
          <Switch 
            id="public-switch" 
            checked={isPublic} 
            onCheckedChange={setIsPublic} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500" />
            <Label htmlFor="comments-switch">Allow comments</Label>
          </div>
          <Switch 
            id="comments-switch" 
            checked={enableComments} 
            onCheckedChange={setEnableComments} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-500" />
            <Label htmlFor="notify-switch">Notify followers</Label>
          </div>
          <Switch 
            id="notify-switch" 
            checked={notifyFollowers} 
            onCheckedChange={setNotifyFollowers} 
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <BookmarkPlus className="h-4 w-4" />
            Save as draft
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share with friends
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Post
        </Button>
      </CardFooter>
    </Card>
  );
}