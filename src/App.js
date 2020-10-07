import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import { Container, Row } from "react-bootstrap";
import NewsCards from "./components/NewsCards";
import FadeIn from "react-fade-in";
import "./App.css";

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_API_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <Container>
        <Row>
          <FadeIn>
            <img
              className="my-5"
              height={350}
              style={{ width: "100%" }}
              src="https://alan.app/voice/images/previews/preview.jpg"
              alt="alanlogo"
            />
          </FadeIn>
        </Row>
        <Row>
          <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
