import Newsletter from "@/sections/newsletter";
import OrganizerCard from "@/components/ui/OrganizerCard";

const data = [
    {
        name: "Marek Ormandík",
        role: "Head of TEDxBratislava",
        image: "/team/marek.png"
    },
    {
        name: "Jana Kováčová",
        role: "Event Manager",
        image: "/team/jana.png"
    },
    {
        name: "Peter Novák",
        role: "Speaker Curator",
        image: "/team/peter.png"
    },
    {
        name: "Lucia Horváthová",
        role: "Marketing Lead",
        image: "/team/lucia.png"
    },
    {
        name: "Martin Kováč",
        role: "Technical Director",
        image: "/team/martin.png"
    },
    {
        name: "Zuzana Šimková",
        role: "Volunteer Coordinator",
        image: "/team/zuzana.png"
    }
]

const Team = () => {
    return (
        <>
            <section className="xl:w-[1238px] lg:w-[950px] lg:mx-auto w-auto mx-5 flex flex-col gap-6 mt-20">
                <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px]">Organizačný Tím</h2>
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                    {data.map((member) => (
                        <OrganizerCard
                            key={member.name}
                            name={member.name}
                            role={member.role}
                            img={member.image}
                        />
                    ))}
                </div>
            </section>
            <Newsletter />
        </>
    )
}

export default Team;