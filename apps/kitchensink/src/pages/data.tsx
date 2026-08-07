import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  Badge,
  Calendar,
  DataView,
  Input,
  Table,
  Text,
  useDataView,
} from "@kamalion/web-ui";

interface Person {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive";
}

const PEOPLE: Person[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  status: i % 4 === 0 ? "Inactive" : "Active",
}));

export function TablePage() {
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const rows = useMemo(() => {
    const sorted = [...PEOPLE.slice(0, 6)].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [sortDir]);

  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Table</Text.H1>
      <Table.Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head
                sortable
                sortDirection={sortDir}
                onSort={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              >
                Name
              </Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((p) => (
              <Table.Row key={p.id}>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>{p.role}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={p.status === "Active" ? "success" : "default"}
                  >
                    {p.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Container>
    </div>
  );
}

export function CalendarPage() {
  const [date, setDate] = useState<Date>();
  const [range, setRange] = useState<DateRange>();

  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Calendar</Text.H1>
      <div className="flex flex-wrap gap-8">
        <div className="flex flex-col gap-2">
          <Text.Small>Single</Text.Small>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="flex flex-col gap-2">
          <Text.Small>Range</Text.Small>
          <Calendar mode="range" selected={range} onSelect={setRange} />
        </div>
      </div>
      <Input className="max-w-xs">
        <Input.Label>Date picker</Input.Label>
        <Input.DatePicker value={date} onValueChange={setDate} />
      </Input>
    </div>
  );
}

export function DataViewPage() {
  const dv = useDataView({ pageSize: 5 });
  const { search, page, pageSize } = dv.queryParams;

  const filtered = useMemo(
    () =>
      PEOPLE.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-6">
      <Text.H1>DataView</Text.H1>
      <DataView
        {...dv}
        data={{ items, total: filtered.length, isLoading: false }}
        buscaPlaceholder="Search people…"
        novoLabel="New person"
        onNovoClick={() => undefined}
      >
        {(person) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-4"
          >
            <div>
              <h4 className="text-sm font-semibold">{person.name}</h4>
              <p className="text-xs text-(--color-foreground-muted)">
                {person.role}
              </p>
            </div>
            <Badge variant={person.status === "Active" ? "success" : "default"}>
              {person.status}
            </Badge>
          </div>
        )}
      </DataView>
    </div>
  );
}
