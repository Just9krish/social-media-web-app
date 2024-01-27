import { getUserSuggestion } from '@/methods/thread';
import UserCard from '../cards/UserCard';
import { User } from '@/utils/interfae';

export default async function RightSideBar() {
  const users: User[] | [] = await getUserSuggestion();

  return (
    <section className="sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-[#DADADA] bg-[#F7F7F7] dark:border-l-dark-4 dark:bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-col flex-1 justify-start">
        <h3 className="text-heading4-medium text-[#333] dark:text-light-1">
          Suggested User
        </h3>

        <div className="mt-7 flex w-[320px] flex-col gap-9">
          {users &&
            users.map((user) => (
              <UserCard
                imgUrl={''}
                name={user.name}
                username={user.username}
                key={user.id}
                userId={user.id}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
