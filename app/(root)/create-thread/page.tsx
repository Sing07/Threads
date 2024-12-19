import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    // console.log("UserInfo-createThread", userInfo._id.toString(), "line 12");
    // console.log("type of userInfo.id:", typeof(userInfo._id), "line 13");
    if (!userInfo?.onboarded) redirect("/onboarding");
    
        const userIdString = userInfo._id.toString();


    return (
        <>
            <h1 className="head-text">Create Thread</h1>

            {/* <PostThread userId={userInfo._id} /> this one doenst work, below will be the error message*/}
            {/* Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
  <... userId={{buffer: ...}}>
              ^^^^^^^^^^^^^^^ */}
            <PostThread userId={userIdString} />
            
        </>
    );
}

export default Page;
