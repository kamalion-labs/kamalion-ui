# Kamalion UI

Kamalion UI\* is a react-based UI library for the Kamalion ecosystem.

## 🎯 Mission

Build a production-ready, high-performance, and accessible UI library for the Kamalion ecosystem. The components will be used in the Kamalion platform. It should be imported as a TailwindCSS v4 + Vite plugin, so there's no need for build the library.

## 🚀 How to use this project

This is a monorepo.

- **packages/ui**: contains the UI components
- **apps/docs**: contains the documentation site
- **apps/kitchensink**: contains examples of all components

### Commands

- `npm run dev`: Start the development server (docs + packages)
- `npm run build`: Build all packages
- `npm run lint`: Run the linter
- `npm run format`: Format the code

## Stack

- **React 19.2**
- **TypeScript**
- **Tailwind CSS**
- **react-hook-form**
- **Zod**
- **Storybook**
- **Maestro**
- **Docusaurus**

## Components

### **Alert**

Callout banner for important notifications, status feedback, and inline messages.

- **Subcomponents**:
  - `Alert.Icon`: Renders status icon representing alert type (info, success, warning, danger).
  - `Alert.Content`: Main wrapper container for alert title and description text.
  - `Alert.Title`: Primary bold heading text for the alert callout.
  - `Alert.Description`: Body text explaining details or actionable steps for the alert.

### **Avatar**

User profile image display with fallback initials and status indicators.

- **Subcomponents**:
  - `Avatar.Image`: Image element for displaying the user profile photo.
  - `Avatar.Fallback`: Fallback text or icon container rendered when image fails to load or is absent.
  - `Avatar.Overlay`: Status indicator dot or badge overlay attached to the avatar frame.

### **Badge**

Compact label for counts, tags, status indicators, and categories.

### **Box**

Low-level layout container supporting flexbox, grid, and semantic HTML elements.

### **Breadcrumb**

Hierarchical navigation trail showing current location within an application.

- **Subcomponents**:
  - `Breadcrumb.Item`: Individual item wrapper within the breadcrumb ordered list.
  - `Breadcrumb.Link`: Interactive link element pointing to a parent route in the path.
  - `Breadcrumb.Current`: Non-interactive text label representing active page path.

### **Button**

Interactive trigger element supporting variants, sizes, loading states, and slot composition via `asChild`.

- **Subcomponents**:
  - `Button.Dropdown`: Dropdown action trigger button integrated with popover/dropdown menus.

### **Calendar**

Date and date-range picker supporting month/year navigation and date selection.

### **Card**

Surface container for grouping related content, featuring header, body, and footer sections.

### **Code**

Text container for formatted code snippets, technical values, and monospaced text.

- **Subcomponents**:
  - `Code.Block`: Multi-line monospaced code block container with syntax formatting.
  - `Code.Inline`: Single-line inline monospaced text badge.

### **DataView** & **useDataView** hook

#### **DataView**

Data display component supporting sorting, filtering, pagination, and custom cell renders.

- **Subcomponents**:
  - `DataView.Root`: Root wrapper establishing context for data grid state and query handling.
  - `DataView.Filter`: Filter bar container housing search inputs, dropdowns, and active filter chips.
  - `DataView.Pagination`: Pagination controls displaying page numbers, navigation arrows, and row counts.

#### **useDataView** hook

State management hook for `DataView` components providing debounced text search, automatic page resets, and synchronized query parameters for client-side or server-side pagination and filtering.

#### Example

```tsx
import { DataView, useDataView } from "@kamalion/web-ui";

const MyComponent = () => {
  const dataView = useDataView({
    pageSize: 10,
    debounceMs: 350,
  });

  const { items, total, isLoading } = useFetchData(dataView.queryParams);

  return (
    <DataView
      {...dataView}
      data={{
        items,
        total,
        isLoading,
      }}
      buscaPlaceholder="Buscar por nome..."
      novoLabel="Novo Item"
      onNovoClick={() => alert("Novo item clicado!")}
    >
      {(item) => (
        <div key={item.id} className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm">{item.name}</h4>
            <p className="text-xs text-muted">{item.category}</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
            {item.status}
          </span>
        </div>
      )}
    </DataView>
  );
};
```

### **Modal** & **useModal** hook

#### **Modal**

Modal dialog overlay for focused workflows, confirmations, and prompt content.

- **Subcomponents**:
  - `Modal.Root`: Root container controlling modal open/close visibility state.
  - `Modal.Trigger`: Button or element that opens the modal dialog.
  - `Modal.Content`: Floating modal box container positioned over the backdrop.
  - `Modal.Header`: Top section of the dialog containing title, subtitle, and primary actions.
  - `Modal.Body`: Main scrollable content area of the modal dialog.
  - `Modal.Footer`: Bottom bar containing action controls (e.g., Save, Cancel buttons).
  - `Modal.Close`: Action control or button that dismisses the dialog.

#### **useModal** hook

Programmatic hook for displaying context-aware confirm and alert dialogs.

```tsx
import { useModal, Button } from "@kamalion/web-ui";

const MyComponent = () => {
  const { openModal } = useModal();

  const handleDelete = () => {
    openModal({
      title: "Delete item",
      description:
        "Are you sure you want to delete this item? This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      position: "center",
      onConfirm: async () => {
        await deleteItem();
      },
    });
  };

  const handleOpenModal = () => {
    openModal({
      content: <p>Modal content</p>,
    });
  };

  return (
    <>
      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={handleOpenModal}>Open Modal</Button>
    </>
  );
};
```

### **Input**, **Form** & **useForm** hook

#### **Form**

Form context integrated with `react-hook-form` and `zod` schema validation.

- **Subcomponents**:
  - `Form.Root`: Main form context bound to `react-hook-form` context.
  - `Form.Errors`: Global summary container displaying form validation error messages. If not present, it will display the errors in the Input components.

#### **useForm** hook

```tsx
import { useForm } from "@kamalion/web-ui";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MyComponent = () => {
  const form = useForm<FormValues>(formSchema);
};
```

#### **Input**

Collection of form field controls (text input, textarea, select, checkbox, radio, switch) with labels and error messaging. The components should be used in standalone (not integrated with Form component using just the `value` and `onChange` props) or integrated with Form component using the `formContext`.

- **Subcomponents**:
  - `Input.Root`: Structural wrapper organizing field components and validation state.
  - `Input.Label`: Label element bound to form field controls. If the form field is required it will display a red star (\*) next to the label.
  - `Input.Text`: Single-line text input field.
  - `Input.TextArea`: Multi-line expanding text input field.
  - `Input.Password`: Obfuscated text field with visibility toggle control.
  - `Input.Number`: Numeric field supporting increment/decrement stepper controls.
  - `Input.Switch`: Toggle switch control for boolean options.
  - `Input.Checkbox`: Checkbox control for binary or multi-select choices.
  - `Input.Group`: Grouping container combining inputs with leading/trailing add-ons.
  - `Input.Icon`: Decorative or functional icon positioned inside input bounds.
  - `Input.Button`: Interactive action button embedded within an input group.
  - `Input.Mask`: Formatted input field applying character masks (e.g., phone, currency, CPF/CNPJ).
  - `Input.DatePicker`: Date selection field displaying interactive calendar popover.
  - `Input.Select`: Custom select dropdown control.
    - `Input.Select.Item`: Selectable option item within select dropdown list.
    - `Input.Select.Group`: Labeled grouping container for related select items.
    - `Input.Select.Label`: Category label text inside select option list.
    - `Input.Select.Separator`: Visual divider line between select option groups.
  - `Input.Autocomplete`: Searchable input field displaying dynamic autocomplete options.
    - `Input.Autocomplete.Item`: Selectable option item within autocomplete suggestion list.
  - `Input.File`: File upload field with drag-and-drop support.
    - `File.List`: Container list displaying uploaded or pending files.
    - `File.Item`: Individual file entry card showing upload details.
    - `File.ItemIcon`: File type indicator icon.
    - `File.ItemName`: Display name text of selected file.
    - `File.Progress`: Upload progress bar indicator.
    - `File.ItemDelete`: Delete action button to remove file from selection.

#### Example (in standalone mode)

```tsx
import { Input } from "kamalion-ui";

const MyComponent = () => {
  const [name, setName] = useState<string>();

  return (
    <Input>
      <Input.Label>Name</Input.Label>
      <Input.Text
        value={name}
        onValueChange={(value) => {
          setName(value);
        }}
      />
    </Input>
  );
};
```

#### Example (in form mode)

```tsx
import { Input, useForm } from "@kamalion/web-ui";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  file: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MyComponent = () => {
  const form = useForm<FormValues>(formSchema, {
    defaultValues: {
      name: "",
      file: null,
    },
  });

  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Input<FormValues> name="name">
        <Input.Label>Name</Input.Label>
        <Input.Text />
      </Input>

      <Input<FormValues> name="file">
        <Input.Label>Upload file</Input.Label>
        <Input.File />
      </Input>

      <Input.Errors />

      <Button type="submit">
        <Button.Icon>
          <PlusIcon />
        </Button.Icon>
        <Button.Content>Submit</Button.Content>
      </Button>
    </Form>
  );
};
```

### **Loading**

Visual indicators for background activity, including spinners, progress bars, and skeleton loaders.

- **Subcomponents**:
  - `Loading.Local`: In-context spinner or skeleton loader confined to component panel.
  - `Loading.Global`: Full-page backdrop overlay spinner for global application transitions.

### **Page** & **usePage** hook

#### **Page**

Main application layout container providing header, sidebar, and content area slots.

- **Subcomponents**:
  - `Page.Navbar`: Drawer/sidebar layout slot housing main app navigation.
  - `Page.Wrapper`: Outer page container wrapping sidebar and content slots.
  - `Page.Header`: Top banner layout container.
    - `Page.Header.Title`: Primary page heading title text.
    - `Page.Header.Subtitle`: Secondary page subtitle or description text.
    - `Page.Header.Breadcrumb`: Embedded navigation breadcrumb trail in page header.
  - `Page.Content`: Main scrollable content body section of page.
  - `Page.Footer`: Bottom page footer container for copyright, links, or status info.
  - `Page.Sidebar`: Right sidebar for auxiliary content or controls.
    - `Page.Sidebar.Header`: Top section of sidebar housing brand logo and title.
    - `Page.Sidebar.Content`: Main scrollable section containing navigation menus.
    - `Page.Sidebar.Footer`: Bottom section of sidebar housing user profile or settings.
  - `Page.Error`: Error state fallback container displaying error messages and retry actions.

#### **usePage** hook

State management hook for updating page header metadata (title, subtitle, tours) dynamically within child route views.

```tsx
import { usePage } from "@kamalion/web-ui";

const UserProfilePage = () => {
  usePage({
    title: "User Profile",
    subtitle: "Manage personal settings and account details",
  });

  return <div>Profile page content...</div>;
};
```

### **Popover**

Floating content container anchored dynamically to a trigger element.

- **Subcomponents**:
  - `Popover.Root`: Root wrapper managing popover floating state.
  - `Popover.Trigger`: Anchor element that toggles popover visibility.
  - `Popover.Content`: Floating content panel rendered inside popover portal.
  - `Popover.Close`: Dismiss action button closing popover.
  - `Popover.Anchor`: Virtual positioning anchor for manual popover placement.

### **Resizable**

Drag-to-resize split-pane layout container for customizable multi-panel interfaces.

- **Subcomponents**:
  - `Resizable.Root`: Outer layout container managing resizable panel flex state.
  - `Resizable.Panel`: Resizable panel section within split layout.
  - `Resizable.Handle`: Interactive drag bar handle for resizing adjacent panels.

### **Sidebar**

Collapsible navigation drawer container with header, menu, submenus, and footer slots.

- **Subcomponents**:
  - `Navbar.Header`: Top section of sidebar housing brand logo and title.
  - `Navbar.Footer`: Bottom section of sidebar housing user profile or settings.
  - `Navbar.Trigger`: Collapse/expand toggle button for sidebar drawer width.
  - `Navbar.Content`: Main scrollable section containing navigation menus.
  - `Navbar.Menu`: Navigation menu tree container.
    - `Navbar.Menu.Category`: Menu section category header.
    - `Navbar.Menu.Item`: Navigation menu item row.
    - `Navbar.Menu.Item.Trigger`: Interactive collapse/expand trigger for nested submenus.
    - `Navbar.Menu.Item.Content`: Collapsible panel container for nested submenu items.

### **Table**

Data table for tabular data with headers, rows, cells, and responsive layouts.

- **Subcomponents**:
  - `Table.Root`: Table element wrapper establishing responsive layout context.
  - `Table.Container`: Outer scroll container supporting horizontal overflow.
  - `Table.Header`: Table header section (`<thead>`) containing column heads.
  - `Table.Body`: Main table body section (`<tbody>`) housing data rows.
  - `Table.Row`: Table row element (`<tr>`).
  - `Table.Head`: Header cell element (`<th>`) supporting column sorting.
  - `Table.Cell`: Data cell element (`<td>`).
  - `Table.Pagination`: Table pagination bar displaying row count and page navigation controls.

### **Text**

Typography component for headers, titles, body copy, captions, and text styling variants.

- **Subcomponents**:
  - `Text.H1`: Primary section heading (`<h1>`).
  - `Text.H2`: Secondary section heading (`<h2>`).
  - `Text.H3`: Tertiary heading (`<h3>`).
  - `Text.H4`: Subheading (`<h4>`).
  - `Text.H5`: Small heading (`<h5>`).
  - `Text.H6`: Minor heading (`<h6>`).
  - `Text.Paragraph`: Standard body copy paragraph (`<p>`).
  - `Text.Lead`: Prominent introductory lead paragraph.
  - `Text.Large`: Emphasized large text block.
  - `Text.Small`: Compact small text element.
  - `Text.Muted`: De-emphasized muted text for secondary details.
  - `Text.Caption`: Small caption label text for annotations or metadata.
  - `Text.Code`: Inline monospaced code text snippet.
  - `Text.Blockquote`: Formatted quote block section (`<blockquote>`).
  - `Text.Span`: Generic styled inline text wrapper (`<span>`).

### **ThemeSelector**

Interactive control for switching application color themes (light, dark, system).

### **Toast** & **useToast** hook

#### **Toast**

Toast notification queue for transient feedback alerts.

- **Subcomponents**:
  - `Toast`: Individual toast notification alert banner item.
  - `ToastViewport`: Fixed screen positioning area rendering active toast stack.

#### **useToast** hook

Trigger hook for firing transient toast notifications across the application.

```tsx
import { useToast, Button } from "@kamalion/web-ui";

const MyComponent = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your settings have been updated successfully.",
      variant: "success",
      duration: 3000,
    });
  };

  return <Button onClick={handleSave}>Save</Button>;
};
```

### **Tooltip**

Informational popover snippet anchored to a target element on hover or focus.

- **Subcomponents**:
  - `Tooltip.Root`: Root wrapper establishing hover/focus delay state.
  - `Tooltip.Provider`: Context provider wrapping application or section for tooltip instances.
  - `Tooltip.Trigger`: Target element triggering tooltip display on hover/focus.
  - `Tooltip.Content`: Floating tooltip text bubble container.
