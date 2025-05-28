import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth";

export function PostItem({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isAuthor = user?.id === post.user_id;

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", post.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    },
  });

  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="p-4 border rounded-lg bg-card mb-4">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={post.avatar_url || ""} />
          <AvatarFallback>
            {post.username?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{post.username}</p>
              <p className="text-sm text-muted-foreground">{timeAgo}</p>
            </div>
            
            {isAuthor && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button 
                    className="text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
                    aria-label="Delete post"
                  >
                    <Trash size={18} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this post? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deletePost()}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <div className="mt-2">
            <p className="text-sm">{post.content}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ThumbsUp
                size={18}
                className={cn(liked && "fill-primary text-primary")}
              />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <MessageSquare size={18} />
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}