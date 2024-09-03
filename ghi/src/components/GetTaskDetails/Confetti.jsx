import Confetti from 'react-confetti';

const GetConfetti = ({ showConfetti }) => {
  return (
    showConfetti && (
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={2000}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1050 }}
      />
    )
  );
};

export default GetConfetti;
