/*








*/

import Link from "next/link";

function NavbarButtons({
    link,
    name,
    className,
}: {
    link: string;
    name: string;
    className: string;
}) {
    return (
        <Link href={link} className={className}>
            {name}
        </Link>
    );
}

function Socials({
    link,
    img,
    size = 70,
    alt = "exampleImg",
}: {
    link: string;
    img?: string;
    size: number;
    alt?: string;
}) {
    return (
        <>
            <a href={link} target="_blank">
                <img width={size} src={img} alt={alt}></img>
            </a>
        </>
    );
}

export default function NavBar() {
    return (
        <>
            <NavbarButtons link="/blog" name={"Blog"} className="navbar-component" />
            <NavbarButtons
                link="/projects"
                name={"Projects"}
                className="navbar-component"
            />
            <NavbarButtons
                link="/aboutme"
                name={"About Me"}
                className="navbar-component"
            />

            <Socials
                link="https://www.linkedin.com/in/santhosh-balla5579/"
                size={100}
                alt="LinkedIn"
                img="/in-logo/LI-Logo.png"
            ></Socials>
            <Socials
                link="https://github.com/santhosh-balla"
                size={100}
                alt="GitHub"
                img="GitHub_Logos/SVG/GitHub_Lockup_Black_Clearspace.svg"
            ></Socials>
        </>
    );
}
