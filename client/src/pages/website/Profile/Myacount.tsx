import { Link } from "react-router-dom";

type MyAccountProps = {
    url: string;
    title: string;
    label?: string | null | undefined;
    text1?: string;
    text2?: string;
};

const MyAccount = ( { title, url, label, text1, text2 }: MyAccountProps ) =>
{
    return (
        <>
            <div className="shadow bg-white px-4 pt-6 pb-8 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-800 text-lg">{ title }</h3>

                    <Link to={ `/profile/${ url }` } className="text-rose-500">
                        Edit
                    </Link>
                </div>

                <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">{ label }</h4>

                    <p className="text-gray-700">{ text1 }</p>

                    <p className="text-gray-700">{ text2 }</p>
                </div>
            </div>
        </>
    );
};

export default MyAccount;
