export type RunsTab = "folders" | "all";

export type TabFilterProps = {
  value: RunsTab;
  onChange: (next: RunsTab) => void;
  labels?: {
    folders?: string;
    all?: string;
  };
};

export type Folder = {
  id: string;
  name: string;
};

export type RunFoldersListProps = {
  onPressFolder?: (folder: Folder) => void;
};
