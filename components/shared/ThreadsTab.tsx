import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

export default async function ThreadsTab({
    currentUserId,
    accountId,
    accountType,
}: {
    currentUserId: string;
    accountId: string;
    accountType: string;
}) {
    // TODO: Fetch profile threads
    const result = await fetchUserPosts(accountId);

    if (!result) redirect("/");

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                            ? {
                                  name: result.name,
                                  image: result.image,
                                  id: result.id,
                              }
                            : {
                                  name: thread.author.name,
                                  image: thread.author.image,
                                  id: thread.author.id,
                              }
                    }
                    community={
                        accountType === "Community"
                            ? {
                                  name: result.name,
                                  id: result.id,
                                  image: result.image,
                              }
                            : thread.community
                    }
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    );
}
