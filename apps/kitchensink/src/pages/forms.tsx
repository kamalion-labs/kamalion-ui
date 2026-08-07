import { useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { Button, Form, Input, Text, useForm, useToast } from "@kamalion/web-ui";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  role: z.string().min(1, "Select a role"),
  agree: z.boolean().refine((v) => v, "You must accept the terms"),
});

type FormValues = z.infer<typeof schema>;

function FormBoundDemo() {
  const { toast } = useToast();
  const form = useForm<FormValues>(schema, {
    defaultValues: { name: "", email: "", password: "", role: "editor", agree: true },
  });

  return (
    <Form
      {...form}
      onSubmit={(data) =>
        toast({
          title: "Form submitted",
          description: `${data.name} · ${data.email} · ${data.role}`,
          variant: "success",
        })
      }
      className="max-w-md"
    >
      <Input<FormValues> name="name" required>
        <Input.Label>Name</Input.Label>
        <Input.Text placeholder="Jane Doe" />
      </Input>

      <Input<FormValues> name="email" required>
        <Input.Label>Email</Input.Label>
        <Input.Text type="email" placeholder="jane@example.com" />
      </Input>

      <Input<FormValues> name="password" required>
        <Input.Label>Password</Input.Label>
        <Input.Password placeholder="••••••" />
      </Input>

      <Input<FormValues> name="role" required>
        <Input.Label>Role</Input.Label>
        <Input.Select placeholder="Choose a role…">
          <Input.Select.Item value="admin">Admin</Input.Select.Item>
          <Input.Select.Item value="editor">Editor</Input.Select.Item>
          <Input.Select.Item value="viewer">Viewer</Input.Select.Item>
        </Input.Select>
      </Input>

      <Input<FormValues> name="agree">
        <Input.Checkbox label="I accept the terms and conditions" />
      </Input>

      <Button type="submit">
        <Button.Content>Create account</Button.Content>
      </Button>
    </Form>
  );
}

function StandaloneDemo() {
  const [name, setName] = useState("");
  const [notify, setNotify] = useState(true);
  const [bio, setBio] = useState("");
  const [qty, setQty] = useState<number | undefined>(1);
  const [phone, setPhone] = useState("");
  const [fruit, setFruit] = useState("");

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Input>
        <Input.Label>Name (standalone)</Input.Label>
        <Input.Text
          value={name}
          onValueChange={setName}
          placeholder="Type your name"
        />
        <Text.Muted>Value: {name || "—"}</Text.Muted>
      </Input>

      <Input>
        <Input.Label>Search (group)</Input.Label>
        <Input.Group>
          <Input.Icon>
            <Search />
          </Input.Icon>
          <Input.Text placeholder="Search…" />
          <Input.Button>Go</Input.Button>
        </Input.Group>
      </Input>

      <Input>
        <Input.Label>Bio</Input.Label>
        <Input.TextArea value={bio} onValueChange={setBio} placeholder="About you" />
      </Input>

      <Input>
        <Input.Label>Quantity</Input.Label>
        <Input.Number value={qty} onValueChange={setQty} min={0} max={10} />
      </Input>

      <Input>
        <Input.Label>Phone (mask)</Input.Label>
        <Input.Mask
          mask="(00) 00000-0000"
          value={phone}
          onValueChange={setPhone}
          placeholder="(11) 90000-0000"
        />
      </Input>

      <Input>
        <Input.Label>Favorite fruit (autocomplete)</Input.Label>
        <Input.Autocomplete
          value={fruit}
          onValueChange={setFruit}
          placeholder="Start typing…"
        >
          <Input.Autocomplete.Item value="Apple">Apple</Input.Autocomplete.Item>
          <Input.Autocomplete.Item value="Banana">Banana</Input.Autocomplete.Item>
          <Input.Autocomplete.Item value="Cherry">Cherry</Input.Autocomplete.Item>
          <Input.Autocomplete.Item value="Grape">Grape</Input.Autocomplete.Item>
        </Input.Autocomplete>
      </Input>

      <Input>
        <Input.Label>Notifications</Input.Label>
        <Input.Switch checked={notify} onValueChange={setNotify} />
      </Input>

      <Input>
        <Input.Label>Attachment</Input.Label>
        <Input.File accept="image/*" />
      </Input>
    </div>
  );
}

export function FormsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Text.H1>Form &amp; Input</Text.H1>
        <Text.Muted>
          Inputs work standalone or bound to a Form (react-hook-form + zod).
        </Text.Muted>
      </div>

      <section className="flex flex-col gap-3">
        <Text.H3>Form-bound (submit empty to see validation)</Text.H3>
        <FormBoundDemo />
      </section>

      <section className="flex flex-col gap-3">
        <Text.H3>Standalone controls</Text.H3>
        <StandaloneDemo />
      </section>
    </div>
  );
}
