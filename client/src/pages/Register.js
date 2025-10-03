import React , { useState } from 'react';

function Register(){
    const[form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        ref: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!form.name || !form.email || !form.password){
            setError('Campos obrigatórios em branco.');
            return;
        }

        if(!validateEmail(form.email)){
            setError('Email inválido.');
            return;
        }

        if(!validatePassword(form.password)){
            setError('Senha deve ter no mínimo 8 caracteres, contendo letras e números.');
            return;
        }

        try{
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if(response.ok){
                setSuccess('Registro efetivado com sucesso!');
                setForm({ name: '', email: '', password: '', ref: '' });
            } else {
                setError(data.message || 'Erro no registro.');
            }
        } catch(err){
            setError('Erro ao conectar com o servidor.');
        }
    };

    return(
        <div>
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Código de Indicação (opcional):</label>
                    <input type="text" name="ref" value={form.ref} onChange={handleChange}></input>
                </div>
                <button type="submit">Registrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default Register;