import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connectionApi } from "../../services/apiconnector";
import { subsection } from "../../services/apis"; // rename later if backend changes
import Button from "./Button";

const Section2 = () => {
  const { id } = useParams(); 

  const [form, setForm] = useState({
    title: "",
    timeDuration: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function createSection2() {
    const fd = new FormData();
    fd.append("sectionId", id);
    fd.append("title", form.title);
    fd.append("timeDuration", form.timeDuration);
    fd.append("description", form.description);
    fd.append("vedioFile", file);

    try {
      const res = await connectionApi(
        subsection.CREATE_SUBSECTION,
        "POST",
        {  },
        null,
        fd
      );

      console.log("Section2 created", res);
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <div className="w-10/12 mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">Add Section2</h2>

      <div className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title"
          className="border rounded-lg px-3 py-2"
          onChange={handleInput}
        />

        <input
          name="timeDuration"
          placeholder="Time Duration"
          className="border rounded-lg px-3 py-2"
          onChange={handleInput}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border rounded-lg px-3 py-2"
          onChange={handleInput}
        />

        <input
          type="file"
          accept="video/*"
          className="border rounded-lg px-3 py-2"
          onChange={handleFile}
        />

        <div onClick={createSection2}>
          <Button active={true}>Create Section 2</Button>
        </div>
      </div>
    </div>
  );
};

export default Section2;

