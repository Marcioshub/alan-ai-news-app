import React, { useState, useEffect, createRef } from "react";
import { Card, Col, Button } from "react-bootstrap";
import FadeIn from "react-fade-in";

export default function NewsCard({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
  activeArticle,
}) {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    <Col ref={elRefs[i]}>
      <FadeIn>
        <Card
          bg={activeArticle === i ? "primary" : null}
          key={i}
          className="m-2 mx-auto"
          style={{ width: "25rem", height: 500 }}
        >
          <Card.Header>
            <div style={{ display: "flex" }}>
              <small style={{ flex: 1 }}>
                {new Date(publishedAt).toDateString()}
              </small>
              <small style={{ flex: 1 }}>{source.name}</small>
            </div>
          </Card.Header>
          <Card.Img
            variant="top"
            width="100%"
            height={200}
            src={
              urlToImage ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0f/Neon_sign_NEWS.jpg"
            }
          />
          <Card.Body className="m-2">
            <Card.Subtitle>{title}</Card.Subtitle>
            <Card.Text className="text-truncate">{description}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <div style={{ display: "flex" }}>
              <Button
                style={{ flex: 1, margin: 5 }}
                variant="light"
                href={url}
                target="_blank"
              >
                Learn More
              </Button>
              <Button
                style={{ flex: 1, margin: 5 }}
                variant="light"
                href={url}
                target="_blank"
              >
                {i + 1}
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </FadeIn>
    </Col>
  );
}
