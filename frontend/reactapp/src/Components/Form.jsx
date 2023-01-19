import React, { useState } from "react";

function Form() {
  const [formDatas, setFormDatas] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userEmail", formDatas?.userEmail);
    formData.append("userName", formDatas?.userName);
    formData.append("userImage", formDatas?.userImage);

    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {},
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data, "res"))
      .catch((err) => console.log(err, "errr"));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormDatas({ ...formDatas, [name]: value });
  };
  console.log(formDatas);

  return (
    <form onSubmit={handleSubmit} action="" method="POST" id="formElem">
      <input
        type="email"
        placeholder="Enter your email"
        name="userEmail"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter your name"
        name="userName"
        onChange={handleChange}
      />
      <input
        type="file"
        placeholder="Upload Image"
        name="userImage"
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
