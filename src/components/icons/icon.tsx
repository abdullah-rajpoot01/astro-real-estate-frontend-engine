import { CircleHelp } from "lucide-react";
import { iconMap } from "./icons-map";

interface IconProps {
    name: string;
    className?: string;
}

export default function IconComponent({
    name,
    className,
}: IconProps) {
    const IconComponent = iconMap[name] ?? CircleHelp;

    return (
        <IconComponent
            className={className}
        />
    );
}

