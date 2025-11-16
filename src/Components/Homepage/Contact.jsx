import React, { useState } from "react";
import { connectionApi } from "../../services/apiconnector.js";
import { contact } from "../../services/apis.js";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await connectionApi(
        contact.CREATE_CONTACT,
        "POST",
        {},
        {},
        form
      );

      console.log(res.data);
      alert("Message Sent Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-3 w-[400px] mx-auto p-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="border p-2 rounded"
        value={form.name}
        onChange={changeHandler}
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="border p-2 rounded"
        value={form.email}
        onChange={changeHandler}
      />

      <textarea
        name="message"
        placeholder="Message"
        className="border p-2 rounded h-28"
        value={form.message}
        onChange={changeHandler}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

