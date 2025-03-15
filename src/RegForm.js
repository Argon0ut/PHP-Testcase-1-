import React, { useState } from "react";
import "./RegForm.css"; // Importing regular CSS

const RegForm = () => {
    const [info, setFormInfo] = useState({ name: "", phone: "" });
    const [message, setMessage] = useState("");

    const changes = (e) => {
        setFormInfo({ ...info, [e.target.name]: e.target.value });
    };

    const submitting = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/backend/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });
    
            const data = await response.json();
            if (data.message) {
                setMessage("OOO " + data.message);
            } else {
                setMessage("XXXX " + data.error);
            }
        } catch (error) {
            setMessage("XXX Ошибка: сервер недоступен");
        }
    };

    return (
        <div className="container">
            {/* Left Section */}
            <div className="left-section">
                <h1>ТЕСТОВОЕ ЗАДАНИЕ</h1>
                <p>Выполните верстку компонента</p>
                <ul>
                    <li>Используйте BEM, React контекст провайдеры, MVVM и CleanArchitecture</li>
                    <li>Flex и Grid системы верстки</li>
                </ul>
                <p>Будем рады видеть вас в нашей команде</p>
                <button>Я все выполнил!</button>
            </div>

            {/* Right Section */}
            <div className="right-section">
                <h2>Тестовая форма для подачи заявки</h2>
                <form onSubmit={submitting}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={info.name}
                        onChange={changes}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        value={info.phone}
                        onChange={changes}
                        required
                    />
                    <button type="submit">Записаться</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default RegForm;
