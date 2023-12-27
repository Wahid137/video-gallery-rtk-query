import { useState } from "react";
import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const [request, setRequest] = useState(false);

    const { data: videos, isError, isLoading } = useGetVideosQuery(undefined, {
        skip: !request, //if skip become true data will not fetch
    });

    useEffect(() => {
        setRequest(true)
    }, [])

    // decide what to render
    let content = null;
    if (isLoading) {
        content = (
            <>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>
        )
    }
    if (!isLoading && isError) {
        content = <Error message="There was an error" />
    }
    if (!isLoading && !isError && videos.length === 0) {
        content = <Error message="No videos Found!" />
    }
    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) => <Video key={video.id} video={video} />)
    }
    return (
        <>
            {content}
        </>
    );
}
