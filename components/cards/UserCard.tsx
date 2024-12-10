'use client'

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function UserCard({
    id,
    name,
    username,
    imgUrl,
    personType,
}: {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}) {
    const router = useRouter();
    return (

        <article className="user-card">
            <div className="user-card__img">
                <Image
                    src={imgUrl}
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            </div>
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">{name}</h4>
                <p className="text-small-medium text-gray-1">@{username}</p>
            </div>

            <Button className="user-card_btn" onClick={() => router.push(
            `/profile/${id}`)}>
                View
            </Button>
        </article>
    );
}
