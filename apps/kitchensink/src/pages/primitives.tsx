import { Box, Text } from "@kamalion/web-ui";

export function BoxPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Box</Text.H1>
      <Text.Muted>
        Low-level polymorphic layout container. Renders any element via `as`.
      </Text.Muted>
      <Box className="flex gap-3">
        <Box className="rounded-(--radius-card) bg-(--color-accent-soft) p-4 text-(--color-accent)">
          div (default)
        </Box>
        <Box
          as="section"
          className="rounded-(--radius-card) bg-(--color-surface-panel-muted) p-4"
        >
          section
        </Box>
      </Box>
    </div>
  );
}

export function TextPage() {
  return (
    <div className="flex flex-col gap-3">
      <Text.H1>The quick brown fox — H1</Text.H1>
      <Text.H2>The quick brown fox — H2</Text.H2>
      <Text.H3>The quick brown fox — H3</Text.H3>
      <Text.H4>The quick brown fox — H4</Text.H4>
      <Text.Lead>
        A lead paragraph introduces the section with emphasis.
      </Text.Lead>
      <Text.Paragraph>
        A standard body paragraph with comfortable line height for reading.
      </Text.Paragraph>
      <Text.Muted>Muted secondary text.</Text.Muted>
      <Text.Caption>Caption / metadata text.</Text.Caption>
      <Text.Blockquote>“A well-designed system is quiet.”</Text.Blockquote>
      <Text.Paragraph>
        Inline <Text.Code>code snippet</Text.Code> within a sentence.
      </Text.Paragraph>
    </div>
  );
}
