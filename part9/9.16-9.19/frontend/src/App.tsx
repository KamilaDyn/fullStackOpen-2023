import { useEffect, useState } from "react";
import "./App.css";
import { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";

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
