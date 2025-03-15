import { Request, Response } from "express";

const calculate = async (req: Request, res: Response) => {
    const { number1, number2, operation } = req.body;
    if (number1 === undefined || number2 === undefined || !operation) {
        return res.status(400).json({ success: false, error: 'Необходимо указать number1, number2 и operation' });
    }

    try {
        console.log("Начинаю вычисления")
        const contract = req.app.locals.contract;
        let tx;
        switch (operation) {
            case '+':
                tx = await contract.add(number1, number2);
                break;
            case '-':
                tx = await contract.subtract(number1, number2);
                break;
            case '*':
                tx = await contract.multiply(number1, number2);
                break;
            case '/':
                if (number2 === 0) {
                    return res.status(400).json({ success: false, error: 'На ноль делить нельзя!' });
                }
                tx = await contract.divide(number1, number2);
                break;
            default:
                return res.status(400).json({ success: false, error: 'Неверная операция' });
        }
        console.log("Запрос отправлен. Tx Hash:", tx.hash);

        // Печатаем информацию о транзакции перед ожиданием
        console.log("Ожидаем подтверждения транзакции...");
        const receipt = await tx.wait(1);  // Ожидаем 1 подтверждение
        console.log("Ответ получен. Статус транзакции:", receipt.status);

        console.log("Ответ получен")
        const event = contract.interface.parseLog(receipt.logs[0]);
        if (event && event.name === "Calculation") {
            console.log("Результат операции:", event.args.result.toString());
            return res.json({ success: true, result: event.args.result.toString() });
        } else {
            console.log("Не удалось найти событие Calculation.");
            return res.status(500).json({ success: false, error: 'Не удалось найти событие Calculation.' });
        }
    } catch (error) {
        console.error(error);
        // @ts-ignore
        res.status(500).json({ success: false, error: error.message });
    }
};


export default calculate;
