export default function AddBookingConfirm({ errorMessage }) {
  console.log("error in modal", errorMessage);
  return (
    <div className="bookingConfirmModal">
      <h3>{errorMessage}</h3>
    </div>
  );
}
