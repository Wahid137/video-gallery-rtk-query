import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isError, error, isLoading } = useGetVideosQuery();

    // decide what to render
    let content = null;

    if (isLoading) {
        content = 
    }


    return (
        <>
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
        </>
    );
}
