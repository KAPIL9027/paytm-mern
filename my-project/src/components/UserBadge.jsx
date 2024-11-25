export const UserBadge = ({name})=>{
    const initials = name.charAt(0).toUpperCase();
    return (
        <p className="font-bold w-8 h-8 border text-center rounded-2xl md:w-9  md:rounded-3xl">
            {initials}
        </p>
    )
}