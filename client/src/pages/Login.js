import React , { useState } from 'react';

function Login(){
    const[form, setForm] = useState({
        email: '',
        password: ''
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

        if(!form.email || !form.password){
            setError('Campos obrigatórios em branco.');
            return;
        }

        if(!validateEmail(form.email)){
            setError('Senha ou email estão incorretos.');
            return;
        }

        if(!validatePassword(form.password)){
            setError('Senha ou email estão incorretos.');
            return;
        }

        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if(response.ok){
                setSuccess('Login efetuado com sucesso!');
                localStorage.setItem('token', data.token);
                window.location.href = '/profile';
            } else {
                setError(data.error || 'Erro ao realizar login.');
            }
        } catch(err){
            setError('Erro ao conectar com o servidor.');
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} />
                </div>
                <button type='submit'>Entrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default Login;