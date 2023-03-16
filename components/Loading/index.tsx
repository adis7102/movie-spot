import Spinner from "react-bootstrap/Spinner";

type Props = {
  loading: boolean;
}

const Loading: React.FC<Props> = ({ loading }) => {
  return loading && (
    <div className="loading-component">
      <Spinner animation="border" variant="light" />
    </div>
  );
};

export default Loading;
