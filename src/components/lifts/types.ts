export type LiftsTab = "folders" | "all";

export type TabFilterProps = {
  value: LiftsTab;
  onChange: (next: LiftsTab) => void;
  labels?: {
    folders?: string;
    all?: string;
  };
};

export type Folder = {
  id: string;
  name: string;
};

export type LiftFoldersListProps = {
  onPressFolder?: (folder: Folder) => void;
};
