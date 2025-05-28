import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Post, Comment } from '@/types';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { useToast } from "@/components/ui/use-toast";

// Mock data for posts
const initialPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '2',
      username: 'nature_photography',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature_photography',
    },
    imageUrl: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=1000&auto=format&fit=crop',
    caption: 'Beautiful sunset over the mountains 🌄',
    likes: 243,
    liked: false,
    comments: [
      {
        id: 'c1',
        user: {
          id: '3',
          username: 'traveler123',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=traveler123',
        },
        text: 'Wow! This view is incredible!',
        createdAt: '2023-05-10T14:23:00Z',
      },
    ],
    createdAt: '2023-05-09T18:30:00Z',
  },
  {
    id: '2',
    user: {
      id: '4',
      username: 'foodie_adventures',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=foodie_adventures',
    },
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop',
    caption: 'Homemade pizza night! 🍕 #foodporn #homecooking',
    likes: 187,
    liked: false,
    comments: [
      {
        id: 'c2',
        user: {
          id: '5',
          username: 'chef_mike',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef_mike',
        },
        text: 'That looks delicious! Care to share the recipe?',
        createdAt: '2023-05-11T09:14:00Z',
      },
    ],
    createdAt: '2023-05-11T08:45:00Z',
  },
  {
    id: '3',
    user: {
      id: '6',
      username: 'fitness_goals',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fitness_goals',
    },
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop',
    caption: 'Morning workout complete! 💪 #fitlife #motivation',
    likes: 312,
    liked: false,
    comments: [],
    createdAt: '2023-05-12T06:20:00Z',
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Load posts from localStorage if available
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Save initial posts to localStorage
      localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
  }, []);
  
  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);
  
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        const likeDelta = newLiked ? 1 : -1;
        
        return {
          ...post,
          liked: newLiked,
          likes: post.likes + likeDelta
        };
      }
      return post;
    }));
    
    toast({
      title: "Post liked",
      description: "Your like has been recorded",
      duration: 1500,
    });
  };
  
  const handleComment = (postId: string, commentText: string) => {
    if (!user) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: user,
      text: commentText,
      createdAt: new Date().toISOString(),
    };
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted",
      duration: 1500,
    });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to view the feed</h1>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-2xl px-4 py-6 mx-auto">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </main>
    </div>
  );
}