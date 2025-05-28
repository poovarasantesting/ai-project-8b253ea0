import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
import { Post, Comment } from '@/types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-md mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img 
            src={post.user.avatar} 
            alt={post.user.username}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{post.user.username}</span>
        </div>
        <button>
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      {/* Post Image */}
      <div className="relative pb-[100%]">
        <img 
          src={post.imageUrl} 
          alt={post.caption}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button 
              className={`${post.liked ? 'text-red-500' : 'text-gray-700'}`}
              onClick={() => onLike(post.id)}
            >
              <Heart className={`w-6 h-6 ${post.liked ? 'fill-red-500' : ''}`} />
            </button>
            <button onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </button>
            <button>
              <Send className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <button>
            <Bookmark className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        
        {/* Likes count */}
        <div className="font-medium mb-2">{post.likes} likes</div>
        
        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium mr-2">{post.user.username}</span>
          <span>{post.caption}</span>
        </div>
        
        {/* Creation date */}
        <div className="text-xs text-gray-500 uppercase mb-2">
          {formatDate(post.createdAt)}
        </div>
        
        {/* Comments section */}
        {showComments && (
          <div className="mt-4 space-y-2">
            <div className="font-medium text-sm text-gray-500 mb-2">
              {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
            </div>
            
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.username}
                  className="w-6 h-6 rounded-full mt-1"
                />
                <div className="flex-1">
                  <div>
                    <span className="font-medium mr-2">{comment.user.username}</span>
                    <span>{comment.text}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add comment form */}
        <form onSubmit={handleSubmitComment} className="mt-4 flex items-center space-x-2">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 h-10 min-h-0 py-2"
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="sm"
            disabled={!commentText.trim()}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}