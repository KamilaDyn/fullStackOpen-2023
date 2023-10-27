import { useEffect, useState } from "react";
import "./App.css";
import { getAllDiaries } from "./services/diaryService";
import AddDiary from "./components/AddDiary";
import { DiaryEntry } from "../../backend/src/types";
import Header from "./components/Header";

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
      <Header title="Add new Diary" />
      <div>
        <AddDiary
          diaries={diaries}
          setDiaries={setDiaries}
          handleError={handleError}
        />
      </div>
      <div>
        <Header title="Diary entries" />

        <ul>
          {diaries.map(({ id, date, weather, visibility }) => (
            <li key={id}>
              <div>
                <h3>{date}</h3>
                <p>Visibility: {visibility}</p>
                <p>Weather: {weather}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
