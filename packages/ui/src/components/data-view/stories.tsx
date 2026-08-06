import { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataView, useDataView } from "./index";
import { Badge } from "../badge";

const meta: Meta<typeof DataView> = {
  title: "Data/DataView",
  component: DataView,
};

export default meta;
type Story = StoryObj<typeof DataView>;

const ALL = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  active: i % 3 !== 0,
}));

function Demo() {
  const dv = useDataView({ pageSize: 5 });
  const { search, page, pageSize } = dv.queryParams;
  const filtered = useMemo(
    () => ALL.filter((x) => x.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-[28rem]">
      <DataView
        {...dv}
        data={{ items, total: filtered.length, isLoading: false }}
        buscaPlaceholder="Search items…"
        novoLabel="New"
        onNovoClick={() => undefined}
      >
        {(item) => (
          <div key={item.id} className="flex items-center justify-between p-4">
            <span className="text-sm font-medium">{item.name}</span>
            <Badge variant={item.active ? "success" : "default"}>
              {item.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        )}
      </DataView>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
