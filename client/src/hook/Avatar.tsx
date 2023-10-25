type AvatarProps = {
    src?: string | null;
};

const Avatar = ( { src }: AvatarProps ) =>
{
    return (
        <>
            <img
                width={ 100 }
                height={ 100 }
                alt="Avatar"
                className="rounded-full max-w-[2.5rem] max-h-[2.5rem]"
                src={ src || "https://tse4.mm.bing.net/th?id=OIP.8WNNoHhrfef0g4uq9DQnjQHaHa&pid=Api&P=0&h=220" }
            />
        </>
    );
};

export default Avatar;
