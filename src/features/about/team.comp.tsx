
import { getAllAgents } from "@/features/agents";
import { WhatsApp } from "@/features/icons";
import { Mail, Phone } from "lucide-react";
import { getAboutTeamSection } from "@/features/about";


const Team = () => {
  const teamSection = getAboutTeamSection();

  if (!teamSection.enabled) return null;

  const agents = getAllAgents();

  if (agents.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col justify-center gap-16 py-10 ">
      <div className="mx-auto max-w-3xl text-center">
        <b className="text-center font-medium text-muted-foreground text-sm uppercase">
          {teamSection.badge}
        </b>
        <h2 className="mt-3 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
          {teamSection.title}
        </h2>
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-xl">
          {teamSection.description}
        </p>

      </div>

      <div className="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {agents.map((member) => (
          <div
            className="flex flex-col items-center rounded-lg border bg-card dark:border-card-foreground/70 px-6 py-8 text-center"
            key={member.name}
          >
            <img
              alt={member.name}
              className="h-16 w-16 shrink-0 rounded-full bg-accent object-cover sm:h-20 sm:w-20"
              height={120}
              src={member.image || ""}
              width={120}
            />
            <h3 className="mt-5 font-medium text-lg">{member.name}</h3>
            {member.title && <p className="text-muted-foreground text-sm">{member.title}</p>}
            {member.bio && <p className="mt-3 mb-6 text-pretty">{member.bio}</p>}
            <div className="mt-auto flex items-center gap-4">
              <a href={`https://wa.me/${member.whatsapp}`} target="_blank">
                <WhatsApp className="h-5 w-5 text-card-foreground/60" />
              </a>
              <a href={`mailto:${member.email}`} target="_blank">
                <Mail className="h-5 w-5 text-card-foreground/60" />
              </a>
              <a href={`tel:${member.phone}`} target="_blank">
                <Phone className="h-5 w-5 text-card-foreground/60" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
