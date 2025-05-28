import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Image, Link, FileText, Upload, X } from "lucide-react";
import { PostUploadOptions } from "@/components/PostUploadOptions";

export function PostCreator() {
  const { toast } = useToast();
  const [postText, setPostText] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just simulate adding an image URL
      const newAttachments = [...attachments];
      for (let i = 0; i < e.target.files.length; i++) {
        // Create a placeholder URL
        newAttachments.push(`https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=500&h=500`);
      }
      setAttachments(newAttachments);
      
      toast({
        title: "Files attached",
        description: `${e.target.files.length} files have been attached to your post`,
      });
    }
  };
  
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const handlePostSubmit = () => {
    if (postText.trim() === "" && attachments.length === 0) {
      toast({
        title: "Cannot post empty content",
        description: "Please add some text or attachments to your post",
        variant: "destructive",
      });
      return;
    }
    
    setShowUploadOptions(true);
  };
  
  const handleSavePost = () => {
    // In a real app, this would save the post to a database
    toast({
      title: "Post published!",
      description: "Your post has been published successfully",
    });
    
    // Reset the form
    setPostText("");
    setAttachments([]);
    setShowUploadOptions(false);
  };
  
  const handleCancel = () => {
    setShowUploadOptions(false);
  };
  
  if (showUploadOptions) {
    return <PostUploadOptions onSave={handleSavePost} onCancel={handleCancel} />;
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="What's on your mind?"
          className="min-h-[120px] mb-4"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        
        {attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {attachments.map((url, index) => (
              <div key={index} className="relative rounded overflow-hidden">
                <img src={url} alt={`Attachment ${index}`} className="w-full h-32 object-cover" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeAttachment(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <Tabs defaultValue="media">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="media">
              <Image className="h-4 w-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="document">
              <FileText className="h-4 w-4 mr-2" />
              Document
            </TabsTrigger>
            <TabsTrigger value="link">
              <Link className="h-4 w-4 mr-2" />
              Link
            </TabsTrigger>
          </TabsList>
          <TabsContent value="media" className="py-4">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-8 w-8 text-gray-500 mb-2" />
                <span className="text-sm text-gray-500">Upload photos or videos</span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <Button variant="outline" size="sm" className="mt-2">
                  Select Files
                </Button>
              </label>
            </div>
          </TabsContent>
          <TabsContent value="document" className="py-4">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-8 w-8 text-gray-500 mb-2" />
                <span className="text-sm text-gray-500">Upload documents</span>
                <input 
                  type="file" 
                  multiple 
                  accept=".pdf,.doc,.docx,.txt" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <Button variant="outline" size="sm" className="mt-2">
                  Select Files
                </Button>
              </label>
            </div>
          </TabsContent>
          <TabsContent value="link" className="py-4">
            <div className="flex flex-col space-y-2">
              <Textarea placeholder="Paste a link here..." className="min-h-[80px]" />
              <Button variant="outline" size="sm" className="self-end">
                Add Link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handlePostSubmit}>
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}