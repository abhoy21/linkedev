import { GitHubUser } from "./mainViewComponent";
import UserCard from "./userCardComponet";

type UserListprops = {
  users: GitHubUser[];
};

export default function UserList({ users }: UserListprops) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {users.map((user) => (
        <UserCard key={user.login} user={user} />
      ))}
    </div>
  );
}
