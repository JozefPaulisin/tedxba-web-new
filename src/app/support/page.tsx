import Newsletter from "@/sections/newsletter";
import Button from "@/components/Button";
import HeroHeaderActivator from "@/components/HeroHeaderActivator";

const Support = () => {
    return (
        <>
            <section className="relative w-full h-[100vh] bg-[url('/images/support/hero.png')] bg-cover bg-center">
                <HeroHeaderActivator theme="dark" />
                <div className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto h-full mx-5 flex flex-col gap-6 justify-center">
                    <div className="max-w-[540px] flex flex-col gap-6">
                        <h2 className="font-medium text-txt-white-prim md:text-[40px] text-[32px] leading-tight">
                            Pomôž nám priniesť myšlienky, ktoré menia veci
                        </h2>
                        <div className="flex flex-wrap gap-4 items-start">
                            <Button
                                text="Podporiť"
                                variant="primary"
                                className="hover:!text-txt-black-prim hover:!bg-white"
                                href="mailto:partneri@tedxbratislava.sk"
                            />
                            <Button
                                className="!text-txt-white-prim"
                                text="Stať sa dobrovoľníkonm"
                                variant="secondary"
                                href="tel:+421949875764"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 items-center gap-5 mt-20 flex lg:flex-row flex-col">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px]">
                            Staňte sa partnérom
                        </h2>
                        <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec">
                            Máte záujem podporiť nás tým, že sa stanete partnerom TEDxBratislava? Kontaktujte nás a radi vám pri káve predstavíme všetky možnosti, ako sa stať partnerom občianskeho združenia TEDxBratislava.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <Button
                            text="Kontaktovať cez partneri@tedxbratislava.sk"
                            variant="primary"
                            href="mailto:partneri@tedxbratislava.sk"
                        />
                        <Button
                            text="Zavolať na +421 949 875 764"
                            variant="secondary"
                            href="tel:+421949875764"
                        />
                    </div>
                </div>
                <img
                    src="/images/support/partner.png"
                    alt="Support us"
                    className="xl:w-[580px] xl:h-[580px] lg:w-[460px] lg:h-[460px] h-[300px] w-full object-cover rounded-[4px]"
                />
            </section>
            <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 items-center gap-5 mt-20 flex lg:flex-row flex-col">
                <img
                    src="/images/support/staff.png"
                    alt="Support us"
                    className="xl:w-[580px] xl:h-[580px] lg:w-[460px] lg:h-[460px] h-[300px] w-full object-cover rounded-[4px]"
                />
                <div className="flex flex-col gap-6 items-start">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px]">
                            Buďte dobrovoľníkom
                        </h2>
                        <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec">
                            Dobrovoľníctvo zvyčajne zahŕňa dva až tri dni — prípravný deň pred podujatím, samotný deň konferencie a príležitostne aj záverečný deň po podujatí. Úlohy dobrovoľníkov pokrývajú rôzne oblasti: registrácia účastníkov, catering, technika, prestávkové aktivity či sprevádzanie rečníkov.
                        </p>
                        <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec">
                            Väčšina úloh je praktická a akčná — možno sa to na prvý pohľad nezdá, no nudiť sa rozhodne nebudete. Čaká vás skvelá atmosféra, nový ľudia a pocit, že ste boli pri niečom, čo by bez vás jednoducho nevzniklo.
                        </p>
                    </div>
                    <Button
                        text="Stáť sa dobrovoľníkom"
                        variant="primary"
                        href="mailto:partneri@tedxbratislava.sk"
                    />
                </div>
            </section>
            <Newsletter />
        </>
    )
}

export default Support;