import { FormEvent, SyntheticEvent, useEffect, useState } from "react";

import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { CgArrowsExchange } from "react-icons/cg";

import Metadata from "../components/Metadata";

const LandingContent = () => {
  const [input, setInput] = useState("");
  const [endpoint, setEndpoint] = useState("https://randomuser.me/api/");
  const [isLoading, setIsLoading] = useState(true);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEndpoint(input);
    setInput("");
  };

  const formChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setInput(value);
  };

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api?endpoint=${endpoint}`);
      const res = await req.json();
      setIsLoading(false);
    })();
  }, [endpoint, isLoading]);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className={"text-center mt-5"}>NextJS CORS Anywhere</h1>
          <h4 className={"text-center mt-4"}>
            <a
              href={"https://github.com/deybyr647/vercel-cors-anywhere"}
              target={"_blank"}
              rel={"noopener noreferrer"}
              className={"btn btn-primary"}
            >
              See Docs
            </a>
          </h4>
        </Col>
      </Row>

      <Row className={"justify-content-center mt-5"}>
        <Col xs={10} md={11} className={"mx-auto"}>
          <Form onSubmit={submitHandler}>
            <Form.Control
              type={"text"}
              placeholder={"Enter URL to Test API..."} //@ts-ignore
              onChange={formChangeHandler}
              value={input}
            />
          </Form>
        </Col>

        <Col xs={2} md={1} className={"justify-content-center"}>
          <Button type={"submit"} variant={"primary"} onClick={submitHandler}>
            <CgArrowsExchange />
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className={"text-center my-5"}>API Response</h2>

          <div className={"d-flex justify-content-between align-baseline mb-3"}>
            <a
              href={`/api?endpoint=${endpoint}`}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              {endpoint}
            </a>

            {isLoading && <Spinner animation={"grow"} variant={"primary"} />}
          </div>

          <iframe
            className={"w-100 vh-100 border border-primary"}
            src={`/api?endpoint=${endpoint}`}
          />
        </Col>
      </Row>
    </Container>
  );
};

const LandingPage = () => {
  return (
    <>
      <div>https://nextjs-cors-anywhere-lime.vercel.app/api?endpoint=url</div>
    </>
  );
};

export default LandingPage;
