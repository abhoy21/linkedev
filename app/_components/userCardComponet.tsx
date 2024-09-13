import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  FolderGit2,
  MapPin,
  Star,
  UsersRound,
} from "lucide-react";
import { GitHubUser } from "./mainViewComponent";

type UserCardProps = {
  user: GitHubUser;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className='bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1'>
      <CardContent className='p-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <Avatar className='h-12 w-12 border-2 border-purple-500'>
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className='text-xl font-semibold text-gray-300'>
              {user.name || user.login}
            </h2>
            <a
              href={user.html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
            >
              @{user.login}
            </a>
          </div>
        </div>

        <div className='flex justify-between text-sm text-gray-400 mb-4'>
          <div className='flex items-center space-x-2'>
            <UsersRound className='h-5 w-5 text-purple-400' />
            <span className='font-mono'>{user.followers}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FolderGit2 className='h-5 w-5 text-purple-400' />
            <span className='font-mono'>{user.public_repos}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Star className='h-5 w-5 text-purple-400' />
            <span className='font-mono'>{user.starred_count}</span>{" "}
          </div>
        </div>
        {user.location && (
          <div className='flex items-center text-sm text-gray-400 mb-4'>
            <MapPin className='h-4 w-4 mr-2 text-purple-400' />
            <span>{user.location}</span>
          </div>
        )}

        <a
          href={user.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors'
        >
          <ExternalLink className='h-4 w-4 mr-2' />
          View Profile
        </a>
      </CardContent>
    </Card>
  );
}
