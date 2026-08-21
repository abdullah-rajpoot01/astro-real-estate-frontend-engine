
import { getAllAgents } from "@/utils/agents";
import { WhatsApp } from "../social-icons";
import { Mail, Phone } from "lucide-react";



const Team = () => {
  const agents = getAllAgents();
  return (
    <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col justify-center gap-16 py-10 ">
      <div className="mx-auto max-w-2xl text-center">
        <b className="text-center font-medium text-muted-foreground text-sm uppercase">
          We&apos;re hiring!
        </b>
        <h2 className="mt-3 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
          Team behind the product
        </h2>
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-xl">
          Our philosophy is simple — hire a team of diverse, passionate people
          and foster a culture that empowers you to do you best work.
        </p>

      </div>

      <div className="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {agents.map((member) => (
          <div
            className="flex flex-col items-center rounded-lg bg-accent px-6 py-8 text-center"
            key={member.name}
          >
            <img
              alt={member.name}
              className="h-16 w-16 shrink-0 rounded-full bg-accent object-cover sm:h-20 sm:w-20"
              height={120}
              src={member.image}
              width={120}
            />
            <h3 className="mt-5 font-medium text-lg">{member.name}</h3>
            {member.title && <p className="text-muted-foreground text-sm">{member.title}</p>}
            {member.bio && <p className="mt-3 mb-6 text-pretty">{member.bio}</p>}
            <div className="mt-auto flex items-center gap-4">
              <a href="#" target="_blank">
                <WhatsApp className="h-5 w-5 stroke-muted-foreground" />
              </a>
              <a href="#" target="_blank">
                <Mail className="h-5 w-5 stroke-muted-foreground" />
              </a>
              <a href="#" target="_blank">
                <Phone className="h-5 w-5 stroke-muted-foreground" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
