import { Modal } from "antd";

const SearchWord = ({
  isModalVisible,
  apiResponse = [],
  setIsModalVisible,
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log(apiResponse);
  return (
    <Modal
      title={`Meaning of ${apiResponse[0].word}`}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      {apiResponse[0].phonetics[0].audio && (
        <audio controls>
          <source src={apiResponse[0].phonetics[0].audio}></source>
        </audio>
      )}

      <h1>{apiResponse[0].word}</h1>

      <small>{apiResponse[0].phonetic}</small>

      {apiResponse.map((eachBlock) => {
        return eachBlock.meanings.map((eachMeaning) => {
          return (
            <div>
              <span>{eachMeaning.partOfSpeech}</span>

              <ol>
                {eachMeaning.definitions.map((definitions) => {
                  return (
                    <li>
                      <h4>{definitions.definition}</h4>

                      <span>
                        {definitions.example ? `"${definitions.example}"` : ""}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        });
      })}
    </Modal>
  );
};

export default SearchWord;
