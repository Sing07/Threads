import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
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
import Link from "next/link";

export default async function Page() {
    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    // all this part ^ above is copied from creat-thread/page.tsx. why is fetchUser(params) and not fetchUser(user.id) ?
    if (!userInfo?.onboarded) redirect("/onboarding");

    //getActivity
    const activity = await getActivity(userInfo.id);

    return (
        <>
            <h1 className="head-text">Activity</h1>

            <section className="mt-10 flex flex-col gap-5">
                {activity.length > 0 ? (
                    <>
                        {activity.map((activity) => (
                            <Link
                                key={activity._id}
                                href={`/thread/${activity.parentId}`}
                            >
                                <article className="activity-card">
                                    <Image
                                        src={activity.author.image}
                                        alt="user_logo"
                                        width={20}
                                        height={20}
                                        className="rounded-full object-cover"
                                    />
                                    <p className="!text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">
                                            {activity.author.name}
                                        </span>{" "}
                                        replied to your thread
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className="!text-base-regular text-light-3">
                        No activity yet
                    </p>
                )}
            </section>
        </>
    );
}
