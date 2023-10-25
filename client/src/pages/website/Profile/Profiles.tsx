import { Outlet, useLocation } from "react-router-dom";

import { profile } from "../../../data/Profile";
import NavProfile from "../../../components/layouts/website/NavProfile";
import Container from "../../../components/layouts/website/Container";


type ProfilePageProps = {
    nameUser: string | undefined;
    imageUser: string | undefined;
};

const ProfilePage = ( { nameUser, imageUser }: ProfilePageProps ) =>
{
    const location = useLocation();

    const path = location.pathname.substring(
        location.pathname.lastIndexOf( "/" ) + 1
    );

    return (
        <>
            <Container>
                <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 pt-4 pb-16">
                        <div className="md:col-span-3 p-3">
                            <NavProfile
                                nameUser={ nameUser }
                                imageUser={ imageUser }
                                path={ path }
                                profile={ profile }
                            />
                        </div>
                        <div className="md:col-span-9 p-3">
                            <Outlet />

                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ProfilePage;
