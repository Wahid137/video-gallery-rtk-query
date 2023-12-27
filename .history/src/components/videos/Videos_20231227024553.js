import { useGetVideosQuery } from "../../features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isError, error, isLoading } = useGetVideosQuery();

    // decide what to render
    let content = null;

    if (isLoading) {
        content = (
            <>
                <VideoLoader />
            </>
        )
    }


    return (
        <>
            <Video />

        </>
    );
}
