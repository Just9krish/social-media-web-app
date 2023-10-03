import {
  CustomSession,
  authOptions,
} from '@/app/api/auth/[...nextauth]/options';
import UserAvatar from '@/components/common/UserAvatar';
import { MoveLeft } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constant';
import CustomTab from '@/components/threads/CustomTab';

export default async function page() {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  const { user } = session;

  return (
    <section>
      <div className="flex items-center gap-4">
        <MoveLeft width={30} height={30} className="text-primary" />

        <h4 className="text-heading3-bold dark:text-light-1 text-left">
          Profile
        </h4>
      </div>

      <div className="flex  items-center gap-4">
        <UserAvatar name={user?.name ?? 'Guest'} image={user?.image ?? ''} />

        <div className="">
          <h4 className="font-bold">{user?.name}</h4>
          <h4 className="text-orange-500 text-md">{user?.username}</h4>
          <h4>{user?.email}</h4>
        </div>
      </div>

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 dark:bg-dark-2 dark:text-light-2 dark:data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 !important">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex min-h-[50px] flex-1 items-center gap-3 dark:bg-dark-2 dark:text-light-2 dark:data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 !important"
              >
                {tab.icon}
                <p className="max-sm:hidden">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              value={tab.value}
              className="w-full dark:text-light-1"
              key={`content-${tab.label}`}
            >
              <CustomTab componentType={tab.value} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
