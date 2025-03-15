import "../styles/Calculator_styles.css";
import { useState } from "react";
import axios from "axios";

const CalculatorPage = () => {
    const [number1, setNumber1] = useState<number | string>("");
    const [number2, setNumber2] = useState<number | string>("");
    const [operation, setOperation] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCalculate = async () => {
        if (number1 === "" || number2 === "" || !operation) {
            setError("Пожалуйста, укажите все значения.");
            return;
        }
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const response = await axios.put("http://localhost:5005/calculate", {
                number1: parseInt(number1 as string),
                number2: parseInt(number2 as string),
                operation
            });

            setResult(response.data.result);
        } catch (err) {
            setError("Произошла ошибка при вычислениях.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Calculator</h1>
            <div className="input-container">
                <input type="number" value={number1} onChange={(e) => setNumber1(e.target.value)}
                       placeholder="Первое число"/>
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="">Выберите операцию</option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <input type="number" value={number2} onChange={(e) => setNumber2(e.target.value)}
                       placeholder="Второе число"/>
            </div>
            {error && <div className="error">{error}</div>}
            <button onClick={handleCalculate} disabled={loading}>
                {loading ? "Загрузка..." : "Вычислить"}
            </button>

            {loading && <p>Подождите, идет вычисление, может занять до 1 минуты...</p>}

            {result !== null && (
                <div>
                    <h2>Результат: {result}</h2>
                </div>
            )}
        </>
    );
};

export default CalculatorPage;
