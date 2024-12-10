import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import {
    Tabs as TS,
    TabsList as TL,
    TabsTrigger as TT,
    TabsContent as TC,
} from "@radix-ui/react-tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

export default async function Page() {
    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    // all this part ^ above is copied from creat-thread/page.tsx. why is fetchUser(params) and not fetchUser(user.id) ?
    if (!userInfo?.onboarded) redirect("/onboarding");

    //Fetch users
    const result = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
    });
    return (
        <section>
            <h1 className="head-text">Search</h1>
            <div className="mt-14 flex flex-col gap-9">
                {result.users.length === 0 ? (
                    <p className="no-result">No users</p>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard key={person.id} id={person.id} name = {person.name} username = {person.username} imgUrl = {person.image} personType = "User" />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}
