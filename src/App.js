import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [img, setImg] = useState()
  const [bodyData, setBodyData] = useState({
    name: 'test',
    age: 1
  })
  let fileArr = []
  const handleChange = (event) => {

    // for (let key in event.target.files) {
    //   fileArr.push(event.target.files[key])
    // }
    // console.log(event.target.files.length)

    let keys = Object.keys(event.target.files)

    for (let y = 0; y < keys.length; y++) {
      fileArr.push(event.target.files[keys[y]])
    }
    console.log("fileArr", fileArr)

    setImg(fileArr)


    // setImg(event.target.files[0]);
    // console.log(img)
  }

  const formData = (file, body = {}) => {
    const formdata = new FormData();
    console.log("formdataimg", file)
    for (let i = 0; i < file.length; i++) {
      formdata.append('file', file[i]);
    }
    Object.keys(body).forEach((key) => {
      console.log(body[key])
      formdata.append(key, body[key]);
    })

    return formdata
  }

  const [imgName, setImgName] = useState()
  let serverPath = `http://localhost:5000/${imgName}`
  const submit = () => {
    console.log("img_files", img)
    const serverData = formData(img, bodyData);
    axios.post('http://localhost:5000/img-upload', serverData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        console.log("res", res.data.data[0].filename)

        setImgName(res.data.data[0].filename)
        // res.data.data.forEach((data) => {

        // })

      }).catch((err) => {
        console.log(err)

      })
  }
  return (
    <>
      <input type="file" className="form-control" name="upload_file" onChange={handleChange} multiple />

      <button type='buitton' onClick={submit}>UPLOAD</button>
      {imgName ? (
        <img src={serverPath} width={200} height={200}></img>
      ) : null}
    </>
  );
}

export default App;
