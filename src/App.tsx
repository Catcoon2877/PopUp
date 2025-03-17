import { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('12');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [displayOption, setDisplayOption] = useState<'month' | 'year'>('month');
  const [error, setError] = useState<string>('');
  const [isInputTouched, setIsInputTouched] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLoanAmount('');
    setLoanTerm('12');
    setMonthlyPayment(null);
    setDisplayOption('month');
    setError('');
    setIsInputTouched(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    setLoanAmount(value);
    setError(''); 
  };

  const handleInputBlur = () => {
    setIsInputTouched(true);
    if (!loanAmount) {
      setError('Поле обязательно должно быть заполнено');
    }
  };


  const calculatePayment = () => {
    const amount = parseFloat(loanAmount);

    if (!amount) {
      setError('Поле обязательно должно быть заполнено');
      setMonthlyPayment(null);
      return;
    }

    const term = parseFloat(loanTerm);

    if (amount && term) {
      const monthly = amount / term;
      setMonthlyPayment(monthly);
      setError('');
    }
  };
   

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="App">
      <button className="center-button" onClick={openModal}>
        Расчет платежей
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <div className="modal-header">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              <h2>Платежи по кредиту</h2>
            </div>
            <p>
                Введите сумму кредита и выберите срок, на который вы хотите его оформить.<br />
                Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы.
                  </p>
             <div className="input-loan">
              <label>Ваша сумма кредита</label>
              <div className="input-loan">
                <input
                  type="text"
                  placeholder="Введите сумму"
                  value={loanAmount ? `${loanAmount} ₽` : ''}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="amount-input"
                />
              </div>
              {(error && isInputTouched) && (
                <div className="error-message">{error}</div>
              )}
            </div>

            <button className="calculate-button" onClick={calculatePayment}>
              Рассчитать
            </button>

            <div className="input-group">
              <label>Количество месяцев?</label>
              <div className="term-buttons">
                <button
                  className={loanTerm === '12' ? 'active' : ''}
                  onClick={() => setLoanTerm('12')}
                >
                  12
                </button>
                <button
                  className={loanTerm === '24' ? 'active' : ''}
                  onClick={() => setLoanTerm('24')}
                >
                  24
                </button>
                <button
                  className={loanTerm === '36' ? 'active' : ''}
                  onClick={() => setLoanTerm('36')}
                >
                  36
                </button>
                <button
                  className={loanTerm === '48' ? 'active' : ''}
                  onClick={() => setLoanTerm('48')}
                >
                  48
                </button>
              </div>
            </div>

            {monthlyPayment !== null && (
              <div className="result">
                <h3>Итого ваш платеж по кредиту:</h3>
                <div className="payment-options">
                  <button
                    className={displayOption === 'year' ? 'active' : ''}
                    onClick={() => setDisplayOption('year')}
                  >
                    в год
                  </button>
                  <button
                    className={displayOption === 'month' ? 'active' : ''}
                    onClick={() => setDisplayOption('month')}
                  >
                    в месяц
                  </button>
                </div>
                <div className="payment-amount">
                  {displayOption === 'year'
                    ? `${(monthlyPayment * 12).toLocaleString('ru')} рублей`
                    : `${monthlyPayment.toLocaleString('ru')} рублей`}
                </div>
              </div>
            )}

            <button className="add-button">Добавить</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;