import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Code,
  Loading,
  Text,
} from "@kamalion/web-ui";

const badgeVariants = [
  "default",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "outline",
] as const;

export function BadgePage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Badge</Text.H1>
      <div className="flex flex-wrap items-center gap-2">
        {badgeVariants.map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function CodePage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Code</Text.H1>
      <Text.Paragraph>
        Inline: <Code.Inline>npm install @kamalion/web-ui</Code.Inline>
      </Text.Paragraph>
      <Code.Block>{`import { Button } from "@kamalion/web-ui";

export const App = () => <Button>Click</Button>;`}</Code.Block>
    </div>
  );
}

export function AlertPage() {
  const variants = ["info", "success", "warning", "danger"] as const;
  return (
    <div className="flex flex-col gap-4">
      <Text.H1>Alert</Text.H1>
      {variants.map((v) => (
        <Alert key={v} variant={v}>
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>{v[0].toUpperCase() + v.slice(1)} alert</Alert.Title>
            <Alert.Description>
              This is a {v} callout describing what happened.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </div>
  );
}

export function AvatarPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Avatar</Text.H1>
      <div className="flex items-center gap-4">
        <Avatar size="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar size="md">
          <Avatar.Image src="https://i.pravatar.cc/100?img=12" alt="User" />
          <Avatar.Fallback>MD</Avatar.Fallback>
          <Avatar.Overlay />
        </Avatar>
        <Avatar size="lg">
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
        <Avatar size="xl">
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Loading</Text.H1>
      <div className="flex items-center gap-6">
        <Loading.Local size="sm" />
        <Loading.Local size="md" label="Loading…" />
        <Loading.Local size="lg" />
      </div>
    </div>
  );
}

export function BreadcrumbPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Breadcrumb</Text.H1>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Current>Breadcrumb</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
