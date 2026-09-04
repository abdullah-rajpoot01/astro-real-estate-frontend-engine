import { CircleHelp } from "lucide-react";
import { iconMap } from "./map.static";

interface IconProps {
    name: string;
    className?: string;
}

export  function IconComponent({
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

