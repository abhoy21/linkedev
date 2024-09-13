import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

type SearchBarProps = {
  location: string;
  setLocation: (location: string) => void;
  searchUsers: () => void;
  loading: boolean;
};

export default function SearchBar({
  location,
  setLocation,
  searchUsers,
  loading,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  };
  return (
    <div className='flex space-x-2 mb-8'>
      <Input
        type='text'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Enter location...'
        className='flex-grow bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
      />
      <Button
        onClick={() => searchUsers()}
        disabled={loading}
        className='bg-purple-600 hover:bg-purple-700 text-white'
      >
        {loading ? (
          <Loader2 className='mr-2 h-5 w-5 animate-spin' />
        ) : (
          <Search className='mr-2 h-5 w-5' />
        )}
        Search
      </Button>
    </div>
  );
}
