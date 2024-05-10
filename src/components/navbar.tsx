import Settings from "@/app/settings/page";
import { ThemeSwitch } from "./theme-switch";


export const Navbar = () => {

    return (

        <div
            className="w-full flex px-4 py-6 items-center justify-end lg:justify-end "
        >
            <div className="hidden sm:flex gap-2">
                <Settings />
                {/* <Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link> */}
                <ThemeSwitch />
            </div>
        </div>
    );
};
