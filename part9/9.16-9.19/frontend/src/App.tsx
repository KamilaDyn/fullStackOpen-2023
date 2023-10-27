import { useEffect, useState } from "react";
import "./App.css";
import { getAllDiaries } from "./services/diaryService";
import AddDiary from "./components/AddDiary";
import { DiaryEntry } from "../../backend/src/types";

type Diary = Omit<DiaryEntry, "comment">;

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  return (
    <>
      {!!error.length && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <AddDiary
          diaries={diaries}
          setDiaries={setDiaries}
          handleError={handleError}
        />
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
