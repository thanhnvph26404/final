import React, { useEffect, useState } from "react";
import { message } from "antd";
import { IUser } from "../../../store/Auth/Auth.interface";
import { useGetUserByTokenMutation } from "../../../store/Auth/Auth.services";
import { useLocation } from "react-router-dom";

interface YourComponentProps
{
    children: ( currentUser: IUser | null ) => React.ReactElement;
}

function YourComponent ( { children }: YourComponentProps )
{
    const location = useLocation();

    const [ getUser ] = useGetUserByTokenMutation();

    const token = localStorage.getItem( "token" );

    const [ currentUser, setCurrentUser ] = useState<IUser | null>( null );

    useEffect( () =>
    {
        if ( token )
        {
            getUser( token )
                .unwrap()
                .then( ( response ) =>
                {
                    setCurrentUser( response?.data );
                } )
                .catch( ( error ) =>
                {
                    message.error( error.data.message );
                } );
        }
    }, [ getUser, token, location ] );



    return children( currentUser );
}

export default YourComponent;
