import { useEffect, useState } from "react";
import "./App.css";
import { getAllDiaries } from "./services/diaryService";
import AddDiary from "./components/AddDiary";
import { DiaryEntry } from "../../backend/src/types";

type Diary = Omit<DiaryEntry, "comment">;

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  return (
    <>
      <div>
        <AddDiary diaries={diaries} setDiaries={setDiaries} />
        <ul>
          {diaries.map(({ id, date, weather, visibility }) => (
            <li key={id}>
              Date: {date}, Weather {weather}, visibility {visibility}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
