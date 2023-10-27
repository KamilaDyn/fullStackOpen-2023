import { useState } from "react";
import Field from "./Field";
import { DiaryEntry, Visibility, Weather } from "../../../backend/src/types";
import { addNewDiary } from "../services/diaryService";
import axios from "axios";
import RadioButtonField from "./RadioButtonField";

type NewDiaryEntry = Omit<DiaryEntry, "id">;
type Diary = Omit<DiaryEntry, "comment">;

interface AddDiaryProps {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  handleError: (error: string) => void;
}

const AddDiary = ({ diaries, setDiaries, handleError }: AddDiaryProps) => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: "",
  });
  const weatherOptions: string[] = Object.values(Weather).map((v) =>
    v.toString()
  );
  const visibilityOptions: string[] = Object.values(Visibility).map((v) =>
    v.toString()
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewDiary((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const addDiary = await addNewDiary(newDiary);
      setDiaries(diaries.concat(addDiary));
    } catch (err: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          handleError(message);
        } else {
          handleError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        handleError("Unknown error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Date"
        name="date"
        value={newDiary.date}
        handleChange={handleChange}
      />
      <div style={{ display: "flex" }}>
        {weatherOptions.map((value) => (
          <RadioButtonField
            key={value}
            label={value}
            name="weather"
            value={value}
            id={value}
            checked={newDiary.weather === value}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div style={{ display: "flex" }}>
        {visibilityOptions.map((value) => (
          <RadioButtonField
            key={value}
            label={value}
            name="visibility"
            value={value}
            id={value}
            checked={newDiary.visibility === value}
            handleChange={handleChange}
          />
        ))}
      </div>
      <Field
        label="Comment"
        name="comment"
        value={newDiary.comment}
        handleChange={handleChange}
      />

      <button type="submit">add</button>
    </form>
  );
};

export default AddDiary;
