import axios from "axios";
import { Diary } from "../types";
import { DiaryEntry, NewDiaryEntry } from "../../../backend/src/types";
const url = "http://localhost:3000/api/diaries";

const getAllDiaries = async () => {
  return await axios.get<Diary[]>(url).then((response) => response.data);
};

const addNewDiary = async (newDiary: NewDiaryEntry) => {
  return await axios
    .post<DiaryEntry>(url, newDiary)
    .then((response) => response.data);
};
export { getAllDiaries, addNewDiary };
