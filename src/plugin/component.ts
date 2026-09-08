type RuntimeRequest = {
  method: string;
  path: string;
  query: string | null;
  body: string;
  tenant_id: string;
  user_id: string;
};

type ComponentResponse = {
  status: number;
  content_type: string;
  body: string;
};

const pages = [
  {
    id: "ts-counter",
    label: "TypeScript",
    icon: "braces",
    scene: {
      id: "community",
      label: "社区插件",
    },
    required_permission: null,
    body: {
      kind: "counter",
      title: "TypeScript Component",
      button: "TypeScript +1",
    },
  },
] as const;

export function definition(): string {
  return JSON.stringify(pages);
}

export function handle(request: string): string {
  const parsed = JSON.parse(request) as RuntimeRequest;
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
