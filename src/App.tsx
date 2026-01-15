import Header from "./components/Header/header";
import Toaster from "./components/Toaster/Toaster";
import Table from "./components/Table/Table";
import BarcodeForm from "./components/BarcodeForm/BarcodeForm";
import Footer from "./components/Footer/Footer";
import vehicleImage from "./images/Vehicle.png";
import { useBarcodeValidating } from "./hooks/useBarcodeValidating";

import "./styles.css";

export default function App() {
  const {
    input,
    setInput,
    error,
    history,
    toast,
    clearToast,
    submit
  } = useBarcodeValidating();

  return (
    <main className="app">
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}

      <Header />

      <section
        className="trackContainer"
        style={{ backgroundImage: `url(${vehicleImage})` }}
      >
        <div className="validateCard">
          <h1>Track your barcode</h1>

          <BarcodeForm
            value={input}
            error={error}
            onChange={(value) => setInput(value)}
            onSubmit={submit}
          />
        </div>
      </section>

      <section className="validateContainer">
        <h2>Recently validated barcode</h2>

        {history.length === 0 && <p>No entries</p>}

        {history.length > 0 && (
          <Table data={history} rowsPerPage={3} />
        )}
      </section>
      <Footer />
    </main>
  );
}

