import { useState } from "react";
import './App.css'

function App () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <button className="center-button" onClick={openModal}>
        Расчёт платежей
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
          <h2> Платеж по кредиту</h2>
          <p>Введите сумму кредита и выберете срок, на который вы хотите его оформить.</p>
          <p>Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы.</p>
          <input></input>
          <button></button>
          <button onClick={closeModal}>Закрыть</button>
          </div>
        </div> 
      )}
    </div>
  );
}

export default App;