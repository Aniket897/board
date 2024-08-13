export interface BlockType {
  id: string;
  name: string;
  laneId: string;
  timestapms: {
    todo: string | null;
    inProgress: string | null;
    done: string | null;
  };
  history: string[];
}

export interface BlocksState {
  blocks: BlockType[];
}

export interface Lane {
  id: string;
  label: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  laneId: string;
  timestamps: {
    created: string | null;
    progress: string | null;
    done: string | null;
  };
  history: string[];
}
