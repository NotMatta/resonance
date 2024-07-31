import { Heart, Reply } from "lucide-react";

const Post = ({postData}:any) => {
    
    const d = new Date("2024-07-31T16:43:29.406Z")

    const getTimeDifferenceString = (createdAt:any) => {
        const now: any = new Date();
        const diffInMs = now - createdAt;

        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
                return `created ${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
                return `created ${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
                return `created ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else if (seconds > 0) {
                return `created ${seconds} second${seconds > 1 ? 's' : ''} ago`;
            } else {
                return 'just been created';
            }
        }

    return(
        <div className="border w-full rounded-xl p-2 box-border flex flex-col gap-2">
            <div className="flex gap-2 items-start">
                <img src={postData.authorPfp} className="rounded-full object-cover size-12"/>
                <div className="flex flex-col justify-start h-full">
                    <h3 className="">Matta</h3>
                    <p className="text-sm">{getTimeDifferenceString(d)}</p>
                </div>
            </div>
            <div>
                <p className="max-w-full">Racism is ok</p>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
                <div className="flex gap-2">
                    <button className="hover:bg-primary hover:text-background duration-200 flex gap-2 items-center p-2"><Heart className="size-6"/><p>Like</p></button>
                    <button className="hover:bg-primary hover:text-background duration-200 flex gap-2 items-center p-2"><Reply className="size-6"/><p>Comment</p></button>
                </div>
                <div className="flex gap-2 opacity-50">
                    <p>99 Likes</p>
                    <p>99 Comments</p>
                </div>
            </div>
        </div>
    )
}

export default Post
