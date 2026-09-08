type RuntimeRequest = {
  kind?: "service_request";
  method: string;
  path: string;
  query: string | null;
  body: string;
  tenant_id: string;
  user_id: string;
};

type PageActionRequest = {
  kind: "page_action";
  page_id: string;
  action_id: string;
  tenant_id: string;
  user_id: string;
};

type ComponentResponse = {
  status: number;
  content_type: string;
  body: string;
};

let count = 0;

function page() {
  return {
    id: "ts-counter",
    label: "TypeScript",
    icon: "braces",
    scene: {
      id: "community",
      label: "社区插件",
    },
    required_permission: null,
    body: {
      kind: "actions",
      title: "TypeScript Component",
      content: `计数：${count}`,
      actions: [{ id: "increment", label: "TypeScript +1" }],
    },
  } as const;
}

export function definition(): string {
  return JSON.stringify([page()]);
}

export function handle(request: string): string {
  const parsed = JSON.parse(request) as RuntimeRequest | PageActionRequest;
  if (parsed.kind === "page_action") {
    if (parsed.page_id !== "ts-counter" || parsed.action_id !== "increment") {
      return JSON.stringify({
        status: 400,
        content_type: "application/json",
        body: JSON.stringify({ error: "page action is not declared" }),
      } satisfies ComponentResponse);
    }
    count += 1;
    return JSON.stringify({
      status: 200,
      content_type: "application/json",
      body: JSON.stringify({ body: page().body }),
    } satisfies ComponentResponse);
  }
  const response: ComponentResponse = {
    status: 200,
    content_type: "application/json",
    body: JSON.stringify({
      message: "Hello from TypeScript Component",
      request: parsed,
    }),
  };
  return JSON.stringify(response);
}
