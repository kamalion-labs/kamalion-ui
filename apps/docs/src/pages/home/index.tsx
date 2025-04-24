import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Box, Button, Form, Input, Page } from "@kamalion/ui";
import { FaBeerMugEmpty, FaXmark } from "react-icons/fa6";

const selectItems = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];

const formSchema = z.object({
  text: z.string().nonempty("Campo obrigatório"),
  button: z.string().nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
  textarea: z.string().nonempty("Campo obrigatório"),
  date: z.coerce.date({
    invalid_type_error: "Campo inválido",
    required_error: "Campo obrigatório",
  }),
  select: z.string().nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

export function HomePage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function handleSend(formData: FormData) {
    console.log(formData);
  }

  return (
    <Page.Content className="p-4">
      <Box.Root>
        <Box.Header>Simple Form</Box.Header>

        <Box.Content>
          <Form.Root form={form} onSubmit={form.handleSubmit(handleSend)}>
            <Input.Root>
              <Input.Label htmlFor="text">Text:</Input.Label>
              <Input.Text {...form.register("text")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="password">Password:</Input.Label>
              <Input.Text type="password" {...form.register("password")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="textarea">Textarea:</Input.Label>
              <Input.Textarea {...form.register("textarea")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="date">DatePicker:</Input.Label>
              <Input.DatePicker {...form.register("date")} />
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="date">Button:</Input.Label>
              <div className="flex">
                <Input.Text {...form.register("button")} />
                <Button.Root>
                  <Button.Content>Button</Button.Content>
                </Button.Root>
              </div>
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="select">Select:</Input.Label>
              <Input.Select {...form.register("select")}>
                {selectItems.map((item, idx) => (
                  <Input.SelectItem key={idx} value={item}>
                    {item}
                  </Input.SelectItem>
                ))}
              </Input.Select>
            </Input.Root>

            <Form.Buttons>
              <Button.Root type="submit" variant="accent">
                <Button.Icon>
                  <FaBeerMugEmpty />
                </Button.Icon>
                <Button.Content>Submit</Button.Content>
              </Button.Root>

              <Button.Root>
                <Button.Icon>
                  <FaXmark />
                </Button.Icon>
                <Button.Content>Cancelar</Button.Content>
              </Button.Root>
            </Form.Buttons>
          </Form.Root>
        </Box.Content>
      </Box.Root>
    </Page.Content>
  );
}
