import { Link } from "react-router-dom";

import { IconType } from "react-icons";
import { IProfileList } from "../store/Profile/Profiles";


type MenuItemProps = {
    label: string;
    icon?: IconType;
    active?: boolean;
    menuDrop?: IProfileList[] | undefined;
    onClick: () => void;
};

const MenuItem = ( {
    label,
    icon: Icon,
    active,
    onClick,
    menuDrop,
}: MenuItemProps ) =>
{
    return (
        <>
            <div className={ `${ menuDrop ? "border-b" : "" }` }>
                <div
                    onClick={ onClick }
                    className={ `px-4 z-10 py-3  transition font-semibold flex
          ${ Icon ? `text-base` : `` }
          ${ active ? `text-rose-500` : `` }
          ${ menuDrop ? "flex flex-col" : "" }
        `}
                >
                    <div className="flex gap-3">
                        { Icon && <Icon size={ 25 } /> }
                        { label }
                    </div>

                    { menuDrop &&
                        menuDrop.map( ( item ) => (
                            <div
                                key={ item.name }
                                className="text-gray-500 hover:text-rose-500 transition py-3 ml-8"
                            >
                                <Link to={ `/profile/${ item.url }` } className="font-normal">
                                    { item.name }
                                </Link>
                            </div>
                        ) ) }
                </div>
            </div>
        </>
    );
};

export default MenuItem;
