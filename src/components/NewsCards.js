import React from "react";
import NewsCard from "./NewsCard";
import { Card, Col } from "react-bootstrap";
import FadeIn from "react-fade-in";

// 00838f
const infoCards = [
  { color: "#1b262c", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#0f4c75",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#3282b8",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
  },
  {
    color: "#150485",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

export default function NewsCards({ articles, activeArticle }) {
  if (!articles.length) {
    return (
      <>
        {infoCards.map((infoCard, index) => (
          <Col key={index}>
            <FadeIn>
              <Card
                className="p-5 m-2 mx-auto"
                style={{
                  backgroundColor: infoCard.color,
                  width: "25rem",
                  height: 300,
                }}
              >
                <Card.Title style={{ color: "white" }}>
                  {infoCard.title}
                </Card.Title>
                <Card.Body>
                  {infoCard.info ? (
                    <h6>
                      <strong style={{ color: "white" }}>
                        {infoCard.title.split(" ")[2]}:
                      </strong>
                      <br />
                      <span style={{ color: "white" }}>{infoCard.info}</span>
                    </h6>
                  ) : null}
                  <br />
                  <Card.Text style={{ color: "white" }}>
                    Try saying: <br /> <i>{infoCard.text}</i>
                  </Card.Text>
                </Card.Body>
              </Card>
            </FadeIn>
          </Col>
        ))}
      </>
    );
  }

  return (
    <>
      {articles.map((article, i) => (
        <NewsCard article={article} activeArticle={activeArticle} i={i} />
      ))}
    </>
  );
}
