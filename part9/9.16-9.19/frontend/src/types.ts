import { DiaryEntry } from "../../backend/src/types";
export type Diary = Omit<DiaryEntry, "comment">;
