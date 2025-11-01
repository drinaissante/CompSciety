export default function Loading({ className = ""}) {
    return (
        <div className={`w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin ${className}`}/>
    );
}