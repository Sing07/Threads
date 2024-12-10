"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}): Promise<void> {
    connectToDB();

    try {
        connectToDB();

        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();

        return await User.findOne({ id: userId });
        // .populate({
        //     path: "community",
        //     model: Community,
        // });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();

        //  TODO: Populate community
        const threads = await User.findOne({ id: userId }).populate({
            path: "threads",
            model: Thread,
            populate: {
                path: "children",
                model: Thread,
                populate: {
                    path: "author",
                    model: User,
                    select: "name image id",
                },
            },
        });

        return threads;
    } catch (error: any) {
        throw new Error(`Failed to fetch user posts: ${error.message}`);
    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        // make sure doesnt search for ourselves
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId },
        };

        // check if searchstring exists
        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ];
        }

        const sortOptions = { createdAt: sortBy };
        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

export async function getActivity(userId: string) {
    try {
        console.log("Received userId:", userId); // Log the userId to check its value

        // Connect to the database (ensure your DB connection logic is in place)
        connectToDB();

        // Step 1: Find the user by custom id field (which is a string)
        const user = await User.findOne({ id: userId });

        // If the user doesn't exist, throw an error
        if (!user) {
            throw new Error("User not found");
        }

        // Step 2: Get the ObjectId for the user
        const userObjectId = user._id; // This is the ObjectId of the user

        // Step 3: Find all threads created by the user (using the ObjectId)
        const userThreads = await Thread.find({ author: userObjectId });

        // Step 4: Extract the child thread ids (replies)
        const childThread = userThreads.reduce((acc, thread) => {
            return acc.concat(thread.children);
        }, []);

        // Step 5: Find replies to the user's threads (exclude the user's own replies)
        const replies = await Thread.find({
            _id: { $in: childThread },
            author: { $ne: userObjectId }, // Ensure we exclude the original author from replies
        }).populate({
            path: "author",
            model: User,
            select: "name image _id",
        });

        console.log("Replies:", replies);
        return replies;
    } catch (error: any) {
        console.error("Error fetching activity:", error.message);
        throw new Error(`Failed to fetch activity: ${error.message}`);
    }
}
