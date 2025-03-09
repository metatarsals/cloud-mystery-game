export default function GradientBackground() {
    return (
        <div className="fixed -z-10 inset-0 overflow-hidden opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
            <div className="absolute inset-0">
                <div className="absolute top-[-40%] right-[25%] w-[800px] h-[800px] bg-blue-500 rounded-full blur-3xl [animation:blob_7s_infinite,float_20s_ease-in-out_infinite]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[600px] bg-blue-600 rounded-full blur-3xl [animation:blob_7s_infinite_2s,float_20s_ease-in-out_infinite_-5s]" />
                <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-blue-700 rounded-full blur-3xl [animation:blob_7s_infinite_4s,float_20s_ease-in-out_infinite_-10s]" />
                <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-blue-800/70 rounded-full blur-3xl [animation:blob_7s_infinite_6s,float_20s_ease-in-out_infinite_-15s]" />
            </div>
        </div>
    );
}