import {
    RiAtomFill,
    RiBrushFill,
    RiDiscussFill,
    RiGlobalFill,
    RiRestaurantFill,
    RiSpeakFill
} from "@remixicon/react";
import ActivityCard from "@/components/ui/ActivityCard";
import { getTranslations } from "next-intl/server";

type ActivitiesData = {
    enabled?: boolean | null;
};

type Props = {
    activities: ActivitiesData;
};

const ActivitiesSection = async ({ activities }: Props) => {
    if (!activities.enabled) return null;

    const t = await getTranslations('ActivitiesSection');

    const data = [
        { title: t('livePerformances.title'), description: t('livePerformances.description'), icon: RiSpeakFill },
        { title: t('activities.title'), description: t('activities.description'), icon: RiAtomFill },
        { title: t('catering.title'), description: t('catering.description'), icon: RiRestaurantFill },
        { title: t('discussions.title'), description: t('discussions.description'), icon: RiDiscussFill },
        { title: t('networking.title'), description: t('networking.description'), icon: RiGlobalFill },
        { title: t('art.title'), description: t('art.description'), icon: RiBrushFill },
    ];

    return (
        <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 mt-20">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {data.map((item, index) => (
                    <ActivityCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default ActivitiesSection;