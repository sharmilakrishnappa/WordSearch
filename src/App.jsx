import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import SearchWord from "./Components/SearchWord";
import "antd/dist/antd.css";
import "./App.css";
import { Row, Col } from "antd/lib/grid";
const ShowLink = ({ word, showModal }) => {
  return word.length >= 5 ? (
    <a
      onClick={() => {
        showModal(word);
      }}
    >
      <u>{word}</u>
    </a>
  ) : (
    word
  );
};

function App() {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [showParagraph, setShowParagraph] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const callApi = (query) => {
    const options = {
      method: "GET",
    };

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`, options)
      .then((response) => response.json())
      .then((response) => setApiResponse(response))
      .catch((err) => console.error(err));
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (word) => {
    callApi(word);
  };

  useEffect(() => {
    if (apiResponse.length > 0) {
      setIsModalVisible(true);
    }
  }, [apiResponse]);

  useEffect(() => {
    if (!isModalVisible) setApiResponse([]);
  }, [isModalVisible]);

  return (
    <div>
      <Row justify="center">
        <Col>
          <p className="styled-font">Enter Text here</p>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <TextArea
            style={{
              width: "60rem",
              height: "15rem",
              margin: "3rem",
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowParagraph(false);
            }}
          ></TextArea>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <button onClick={() => setShowParagraph(true)} className="styled-btn">
            Submit
          </button>
        </Col>
      </Row>
      <Row justify="center">
        {showParagraph && (
          <Col className="styled-btm">
            {searchQuery.split(" ").map((each) => (
              <span style={{ margin: "0px 2px" }}>
                <ShowLink word={each} showModal={showModal} />
              </span>
            ))}
          </Col>
        )}
      </Row>
      {apiResponse.length > 0 && (
        <SearchWord
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          apiResponse={apiResponse}
        />
      )}
    </div>
  );
}

export default App;
