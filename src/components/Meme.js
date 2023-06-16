import React, { useState, useEffect } from "react"
export default function Meme() {
  // Single Meme
  const [meme, setMeme] = useState({
    topText: "Top Text",
    bottomText: "Bottom Text",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  })
  // All Memes
  const [allMemes, setAllMemes] = useState([])
  useEffect(() => {
    async function getMemes() {
      const response = await fetch("https://api.imgflip.com/get_memes")
      const data = await response.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  }, [])
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }))
  }
  function handleChange(event) {
    const { name, value } = event.target
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }))
  }
  return (
    <main>
      <div>
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
      <div className="form">
        <input
          type="text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          placeholder="Top text"
          className="form--input"
        />
        <input
          type="text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          placeholder="Bottom text"
          className="form--input"
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
    </main>
  )
}
