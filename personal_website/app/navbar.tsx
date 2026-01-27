/*








*/

import Link from "next/link";

function NavbarButtons({
  link,
  name,
 
}: {
  link: string;
  name: string;
  
}) {
  return (
    <Link style ={{ color: 'white' }}href={link}>
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
    <div>
      <a href={link} target="_blank">
        <img width={size} src={img} alt={alt}></img>
      </a>
    </div>
  );
}

export default function NavBar() {
  return (
    <div className = 'navbar-container'>
      <NavbarButtons link="/blog" name={"Blog"} />
      <NavbarButtons
        
        link="/projects"
        name={"Projects"}
      />
      <NavbarButtons
       
        link="/aboutme"
        name={"About Me"}
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
    </div>
  );
}
