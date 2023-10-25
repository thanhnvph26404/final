import { IconType } from "react-icons";

export interface IProfile
{
    title: string;
    url: string;
    Icon: IconType;
    list?: IProfileList[];
}

export interface IProfileList
{
    name: string;
    url: string;
}
