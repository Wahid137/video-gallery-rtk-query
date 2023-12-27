import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isError, error, isLoading } = useGetVideosQuery();
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
