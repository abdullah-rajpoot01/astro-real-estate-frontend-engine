import { Button } from "@/components/ui/button"
import { Cloud, Globe, IdCard, Lock } from "lucide-react"
import { Github } from "../icons"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

export const TokenMainPageComp = () => {

    function redirectToCloudflareTokenCreation() {
        const permissions = [
            { key: "workers_routes", type: "edit" },
            { key: "workers_scripts", type: "edit" },
            { key: "workers_kv_storage", type: "edit" },
            { key: "workers_tail", type: "read" },
            { key: "workers_r2", type: "edit" },
            { key: "account_settings", type: "read" },
            { key: "user_details", type: "read" },
            { key: "memberships", type: "read" },
            { key: "page", type: "edit" }
        ];

        const permissionGroupKeys = encodeURIComponent(
            JSON.stringify(permissions)
        );

        const tokenName = encodeURIComponent(
            "Workers & Pages Deployment Token"
        );

        const url =
            "https://dash.cloudflare.com/profile/api-tokens" +
            "?permissionGroupKeys=" + permissionGroupKeys +
            "&accountId=*" +
            "&zoneId=all" +
            "&name=" + tokenName;
        window.open(url, "_blank")
    }

    function redirectToGitHubTokenCreation() {
        const permissions = {
            actions: "write",
            administration: "write",
            contents: "write",
            deployments: "write",
            environments: "write",
            issues: "write",
            pages: "write",
            pull_requests: "write",
            secrets: "write",
            variables: "write",
            webhooks: "write",
            workflows: "write",
            metadata: "read",
            code_scanning_alerts: "write",
            dependabot_alerts: "write",
            dependabot_secrets: "write",
            secret_scanning_alerts: "write",
            commit_statuses: "write",
            discussions: "write",
            repository_security_advisories: "write",
            vulnerability_alerts: "write"

        };

        const params = new URLSearchParams();

        // Token name
        params.set("name", "Sveltia CMS");

        // Add permissions
        for (const [permission, access] of Object.entries(permissions)) {
            params.set(permission, access);
        }

        const url =
            "https://github.com/settings/personal-access-tokens/new?" +
            params.toString();
        window.open(url, "_blank")
    }


    return (
        <div className="w-full min-h-screen max-w-7xl mx-auto">

            <div className="flex flex-col gap-4 items-center max-w-sm mx-auto pt-10">
                <InputGroup>
                    <InputGroupAddon>
                        <Globe className="text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                        className="border-0 shadow-none focus-visible:ring-0"
                        placeholder="Website Name"
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <IdCard className="text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                        className="border-0 shadow-none focus-visible:ring-0"
                        placeholder="Website ID"
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <Lock className="text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                        className="border-0 shadow-none focus-visible:ring-0"
                        placeholder="Password"
                        type="text"
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <Github className="text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                        className="border-0 shadow-none focus-visible:ring-0"
                        placeholder="Github Token"
                        type="text"
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>
                        <Cloud className="text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupInput
                        className="border-0 shadow-none focus-visible:ring-0"
                        placeholder="Cloudflare Token"
                        type="text"
                    />
                </InputGroup>

                <Button className="w-full">Create Website</Button>
                <div className="flex gap-3 items-center">
                    <div className="border w-10 h-px border-foreground" />
                    <div className="text-xs">Don't have token create new one</div>
                    <div className="border w-10 h-px border-foreground" />
                </div>

                <Button onClick={redirectToCloudflareTokenCreation} className="w-full">
                    <Cloud />
                    Create Cloudflare Token
                </Button>
                <Button onClick={redirectToGitHubTokenCreation} className="w-full">
                    <Github />
                    Create Github Token
                </Button>
            </div>
        </div>
    )
}
