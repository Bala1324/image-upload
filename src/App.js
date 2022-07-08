import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [img, setImg] = useState([])
  const handleChange = (event) => {
    setImg(event.target.files[0]);
    console.log(img)
    // console.log(URL.createObjectURL(event.target.files[0]));
  }

  const submit = () => {
    const formdata = new FormData();
    formdata.append('file', img);
    formdata.append('data', { name: 'bala' });
    // console.log(img)

    console.log("formData", formdata)
    axios.post('http://localhost:5000/img-upload', formdata,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        console.log("res", res)
      }).catch((err) => {
        console.log(err)

      })
  }
  return (
    <>
      <input type="file" className="form-control" name="upload_file" onChange={handleChange} />
      <button type='buitton' onClick={submit}>UPLOAD</button>
    </>
  );
}

export default App;
