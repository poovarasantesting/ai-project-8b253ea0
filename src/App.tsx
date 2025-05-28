import { Toaster } from "@/components/ui/toaster";
import { PostCreator } from "@/components/PostCreator";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Social Media Post Creator</h1>
        <PostCreator />
      </div>
      <Toaster />
    </div>
  );
}