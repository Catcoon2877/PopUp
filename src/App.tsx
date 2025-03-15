import { useState } from "react";
import './App.css'

function App () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPlayment] = useState<number | null>(null);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLoanAmount('');
    setLoanTerm('');
    setMonthlyPlayment(null);
  };

  const calculatePayment = () => {
    const amount = parseFloat (loanAmount);
    const term = parseFloat(loanTerm);

    if (amount && term) {
      const monthly = amount / term;
      setMonthlyPlayment(monthly);
    } else {
      alert('Пожалуйста, введите корректные данные');
    }
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

            <div className="input-group">
             <label>Ваша сумма кредита</label>
              <input
              type="number"
              placeholder="Введите сумму"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
          />
          </div>

          <div className="input-group">
            <label> Количество месяцев?</label>
            <div className="term-button">
            <button onClick={()=> setLoanTerm('12')}>12</button>
            <button onClick={()=> setLoanTerm('24')}>24</button>
            <button onClick={()=> setLoanTerm('36')}>36</button>
            <button onClick={()=> setLoanTerm('48')}>48</button>
            </div>
          </div>

          <button className="calculate-button" onClick={calculatePayment}>
            Рассчитать
          </button>

          {monthlyPayment !== null && (
            <div className="result">
              <h3>Ежемесячный платеж</h3>
              <p>{monthlyPayment.toFixed(2)} ₽</p>
              </div>
          )}

          <button className="close-button" onClick={closeModal}>
            Закрыть
            </button>   
          </div>
        </div> 
      )}
    </div>
  );
}

export default App;