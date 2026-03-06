import Image from "next/image";
import { RiLinkedinBoxFill, RiMailFill } from "@remixicon/react";

type OrganizerCardProps = {
    name: string;
    role: string;
    linkedin?: string;
    mail?: string;
    img?: string;
}

const OrganizerCard = (
    {
        name,
        role,
        linkedin,
        mail,
        img,
    } : OrganizerCardProps
) => {
    return (
        <div className="flex flex-col">
            <img
                src={img ?? "/placeholder.png"}
                alt={name}
                className="h-[360px] w-full object-cover"
            />
            <div className="flex gap-3 mt-3">
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium md:text-xl text-lg dark:text-txt-white-prim text-txt-black-prim">
                        {name}
                    </h3>
                    <p className="font-light text-base dark:text-txt-white-sec text-txt-black-sec">
                        {role}
                    </p>
                </div>
                <div className="flex gap-2">
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer">
                            <RiLinkedinBoxFill size={20} className="dark:text-txt-white-sec text-txt-black-sec" />
                        </a>
                    )}
                    {mail && (
                        <a href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer">
                            <RiMailFill size={20} className="dark:text-txt-white-sec text-txt-black-sec" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrganizerCard;