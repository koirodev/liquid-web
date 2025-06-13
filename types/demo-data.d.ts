export interface DemoData {
  title: string;
  content: string | null;
  children?: DemoData[];
}
