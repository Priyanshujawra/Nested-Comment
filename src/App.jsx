import "./App.css";
import Nested_comment from "./components/Nested_comment";
import comment_data from "./data/comment_data.json";
function App() {
  return (
    <>
      <Nested_comment
        comments={comment_data}
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={() => {}}
      />
    </>
  );
}

export default App;
