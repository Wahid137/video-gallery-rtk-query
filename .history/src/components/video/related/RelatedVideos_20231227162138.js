import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            <RelatedVideo />
        </div>
    );
}
